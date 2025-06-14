import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useLocalSearchParams, Link} from 'expo-router';

import Title from '@/app/general/Title';
import SubTitle from '@/app/general/SubTitle';
import CustomButton from '@/app/general/CustomButton';
import ExpenseDetailModal from '@/app/(tabs)/expense/ExpenseDetailModal';

import { styles_categoryDetails } from '@/styles/styles_categoryDetails';
import CustomDarkTheme from '@/theme/CustomDarkTheme';
import CustomDefaultTheme from '@/theme/CustomDefaultTheme';

import { AuthContext } from '@/app/ctx';
import { getCategoryById } from '@/api/CategoryController';
import { getExpensesByCategoryAndDate } from '@/api/ExpenseController';
import { getBudgetByCategoryAndDate } from '@/api/BudgetController';
import { getMostRecentResult } from '@/api/ResultController';
import { getUserPreferenceByName } from '@/api/PreferenceController';
import { getPeriodByDate } from '@/api/PeriodController';

import { Category } from '@/models/category';
import { Expense } from '@/models/expense';
import { Result } from '@/models/periodresult';
import { GetPercentageSpent } from '@/helpers/GeneralHelpers';

const CategoryDetails = (): React.JSX.Element => {
    const { user } = useContext(AuthContext);
    const { CategoryId, Month, Year } = useLocalSearchParams<{
        CategoryId: string;
        Month: string;
        Year: string;
    }>();

    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categoryDetails(currentTheme);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [category, setCategory] = useState<Category | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [budgetAmount, setBudgetAmount] = useState<number>(0);
    const [result, setResult] = useState<Result | null>(null);
    const [valuta, setValuta] = useState<string>("$");
    const [modalVisible, setModalVisible] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parsedMonth = parseInt(Month) - 1
                const parsedYear = parseInt(Year)
                const parsedCategoryId = parseInt(CategoryId)

                const [period, cat] = await Promise.all([
                    getPeriodByDate(user.id, new Date(parsedYear, parsedMonth, 1)),
                    getCategoryById(user.id, parsedCategoryId)
                ])

                const [expenses, budget, resultRaw] = await Promise.all([
                    getExpensesByCategoryAndDate(user.id, cat.id, period.id),
                    getBudgetByCategoryAndDate(user.id, cat.id, period.id),
                    getMostRecentResult(user.id, cat.id, period.id)
                ])

                const percentageSpent = !isNaN(resultRaw.totalSpent)
                    ? (resultRaw.totalSpent / budget.amount) * 100
                    : 0;

                const result = {
                    ...resultRaw,
                    percentageSpent,
                }

                const valutaPref = await getUserPreferenceByName(user.id, 'Valuta');

                setCategory(cat);
                setExpenses(expenses);
                setBudgetAmount(budget.amount);
                setResult(result);
                setValuta(valutaPref?.stringValue ?? '$');
            } catch (err) {
                console.error(err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id,  CategoryId, Month, Year]);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text style={{ color: '#ff4444' }}>{error}</Text>;
    if (!category || !result) return <Text>Invalid category or result</Text>;

    const renderExpenses = (): React.JSX.Element[] =>
        expenses
            .filter(e => e.categoryId === category.id)
            .map((expense, i) => {
                const padded = expense.amount.toFixed(2).padEnd(8, ' ');
                const date = new Date(expense.date);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                const label = `${valuta}${padded} ${formattedDate} - ${expense.description}`;

                return (
                    <View key={i}>
                        <TouchableOpacity onPress={() => setModalVisible(expense.id)}>
                            <View style={styles.expenseItemView}>
                                <FontAwesome name={'minus'} size={16} color={currentTheme.colors.textColor} />
                                <Text style={styles.expenseItemText}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                        <ExpenseDetailModal
                            visible={modalVisible === expense.id}
                            onClose={() => setModalVisible(null)}
                            data={expense}
                            valuta={valuta}
                        />
                    </View>
                );
            });

    return (
        <SafeAreaView style={styles.container}>
            <Title text={category.name} />
            <SubTitle
                text={`${valuta}${result.totalSpent.toFixed(2)} / ${valuta}${budgetAmount.toFixed(2)}`}
            />
            <Text style={styles.titleText}>
                Status: {GetPercentageSpent(result.totalSpent, budgetAmount).toFixed(2)}%
            </Text>
            <Text style={styles.titleText}>Expenses</Text>

            <ScrollView contentContainerStyle={styles.categoryList}>
                {renderExpenses()}
                <Link
                    href={{
                        pathname: '/expense/[categoryId]/[categoryName]',
                        params: { categoryId: category.id, categoryName: category.name },
                    }}
                >
                    <CustomButton text="Back" color="" />
                </Link>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryDetails;
