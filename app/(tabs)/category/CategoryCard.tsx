import { ActivityIndicator, Text, useColorScheme, View } from 'react-native';
import { styles_categoryCard } from "@/styles/styles_categoryCard";
import React, { useContext, useEffect, useState } from "react";
import { getMostRecentPeriod } from "@/api/PeriodController";
import { getMostRecentResult } from "@/api/ResultController";
import { getBudgetByCategoryAndDate } from "@/api/BudgetController";
import { GetPercentageSpent } from "@/helpers/GeneralHelpers";
import { AuthContext } from "@/app/ctx";
import { Link } from "expo-router";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import { Category } from "@/models/category";
import { getUserPreferenceByName } from "@/api/PreferenceController";
import { Budget } from "@/models/budget";
import { Result } from "@/models/periodresult";

type Props = {
    category: Category;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
    const { user } = useContext(AuthContext);
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categoryCard(currentTheme);

    const [state, setState] = useState<{
        loading: boolean;
        error: any;
        result: Result | null;
        budget: Budget | null;
        valuta: string;
    }>({
        loading: true,
        error: null,
        result: null,
        budget: null,
        valuta: "$",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [period, valutaPref] = await Promise.all([
                    getMostRecentPeriod(user.id, category.id),
                    getUserPreferenceByName(user.id, "Valuta")
                ]);

                const [result, rawBudget] = await Promise.all([
                    getMostRecentResult(user.id, category.id, period.id),
                    getBudgetByCategoryAndDate(user.id, category.id, period.id)
                ]);

                const budgetInstance = new Budget(rawBudget); // assume rawBudget matches Budget constructor

                setState({
                    loading: false,
                    error: null,
                    result,
                    budget: budgetInstance,
                    valuta: valutaPref?.stringValue || "$"
                });
            } catch (err) {
                console.error(err);
                setState(prev => ({ ...prev, loading: false, error: err }));
            }
        };

        fetchData();
    }, []);

    const { loading, error, result, budget, valuta } = state;
    const spent = result?.totalSpent ?? 0;
    const budgetAmount = budget?.amount ?? 0;
    const percentage = GetPercentageSpent(spent, budgetAmount);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text style={{ color: "#FFFFFF" }}>Error: {error.message}</Text>;

    return (
        <Link href={`/(tabs)/expense/${category.id}/${category.name}`}>
            <View style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.spent}>
                    {valuta} {spent.toFixed(2)} / {valuta} {budgetAmount.toFixed(2)}
                </Text>
                <Text style={styles.status}>
                    Status: {percentage.toFixed(2)}%
                </Text>
            </View>
        </Link>
    );
};

export default CategoryCard;
