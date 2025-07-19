import {ActivityIndicator, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {getBudgetByCategoryAndPeriod, getCategories, getMostRecentPeriod} from "@/api";
import {AuthContext} from "@/app/ctx";
import BudgetItem from "@/app/components/UI/BudgetItem";
import {useThemeContext} from "@/theme/ThemeContext";

const BudgetPanel = () => {
    const { userState } = useContext(AuthContext);
    const user = userState.user;

    const { currentTheme } = useThemeContext()

    const [loading, setLoading] = useState(false);
    const [categoryBudgets, setCategoryBudgets] = useState<
        { categoryName: string; budget: number }[]
    >([]);

    const userId = user?.id
    useEffect(() => {
        const loadBudgets = async () => {
            try {
                setLoading(true);
                const categories = await getCategories(user.id);

                const budgetData: { categoryName: string; budget: number }[] = [];

                for (const category of categories) {
                    const mostRecentPeriod = await getMostRecentPeriod(
                        user.id,
                        category.id
                    );

                    const budget = await getBudgetByCategoryAndPeriod(
                        user.id,
                        category.id,
                        mostRecentPeriod.id
                    );

                    budgetData.push({
                        categoryName: category.name,
                        budget: budget?.amount ?? 0,
                    });
                }

                setCategoryBudgets(budgetData);
            } catch (err) {
                console.error("Error loading budgets", err);
            } finally {
                setLoading(false);
            }
        };

        loadBudgets();
    }, [userId]);

    const pairs: React.JSX.Element[] = []
    for (const budget of categoryBudgets){
        pairs.push(
            <View key={budget.categoryName}>
                <BudgetItem name={budget.categoryName} budget={budget.budget} />
            </View>
        )
    }
    if (loading) return (
        <View style={{
            marginTop: 10,
            flex: 1,
            backgroundColor: currentTheme.colors.background,
            paddingBottom: currentTheme.spacing.xl,
        }}>
            <ActivityIndicator/>
        </View>
    )

    return (
        <View style={{
            width: '100%'
        }}>
            {pairs}
        </View>
    );
}

export default BudgetPanel
