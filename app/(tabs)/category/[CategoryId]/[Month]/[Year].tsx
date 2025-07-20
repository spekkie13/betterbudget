import React, {useMemo} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Title, SubTitle, Button } from '@/app/components/General'
import { useThemeContext } from "@/theme/ThemeContext"
import ExpensePanel from "@/app/components/UI/Expense/ExpensePanel"
import { styles_categoryDetails } from '@/styles/tabs/category/styles_categoryDetails'
import { ConvertToPercentage } from '@/helpers'
import {usePeriod, useCategoryDetails, useUpdateCategory} from "@/hooks"

const CategoryDetails = (): React.JSX.Element => {
    const { CategoryId, Month, Year } = useLocalSearchParams<{ CategoryId: string; Month: string; Year: string }>()

    const date = useMemo(() => new Date(Number(Year), Number(Month) - 1, 1), [Year, Month]);
    const numericCategoryId = useMemo(() => Number(CategoryId), [CategoryId]);

    const { periodState } = usePeriod({date: date, categoryId: numericCategoryId})

    const { categoryDetailsState, valuta } = useCategoryDetails({ period: periodState.period, categoryId: numericCategoryId })
    const { updateResult } = useUpdateCategory({category: categoryDetailsState.category, expenses: categoryDetailsState.expenses, period: periodState.period})

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryDetails(currentTheme), [currentTheme])

    if (periodState.loading || categoryDetailsState.loading)
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )

    if (periodState.error) return <Text style={styles.errorMessage}>{periodState.error}</Text>
    if (categoryDetailsState.error) return <Text style={styles.errorMessage}>{categoryDetailsState.error}</Text>
    if (!periodState?.period || !categoryDetailsState?.category || !categoryDetailsState?.result) {
        return <Text>Invalid category or result</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Title text={categoryDetailsState?.category.name} />
            <SubTitle
                text={`${valuta}${categoryDetailsState?.result.totalSpent.toFixed(2)} / ${valuta}${categoryDetailsState.budget.amount.toFixed(2)}`}
            />
            <Text style={styles.titleText}>
                Status: {ConvertToPercentage(categoryDetailsState?.result.totalSpent, categoryDetailsState.budget.amount).toFixed(2)}%
            </Text>
            <Text style={styles.titleText}>Expenses</Text>

            <ScrollView contentContainerStyle={styles.categoryList}>
                <ExpensePanel expenses={categoryDetailsState?.expenses} category={categoryDetailsState?.category} />
                <Button
                    text="Back"
                    onPress={async () => {
                        await updateResult(categoryDetailsState.budget)
                        router.push({
                            pathname: '/add/[categoryId]/[categoryName]',
                            params: { categoryId: categoryDetailsState?.category.id, categoryName: categoryDetailsState?.category.name },
                        })
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoryDetails
