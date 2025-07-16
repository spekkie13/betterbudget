import React from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Title, SubTitle, Button } from '@/app/components/General'
import { useThemeContext } from "@/theme/ThemeContext"
import ExpensePanel from "@/app/components/UI/Expense/ExpensePanel"
import { styles_categoryDetails } from '@/styles/tabs/category/styles_categoryDetails'
import { ConvertToPercentage } from '@/helpers/GeneralHelpers'
import { useCategoryDetails } from "@/hooks"
import {useUpdateCategory} from "@/hooks/useUpdateCategory";

const CategoryDetails = (): React.JSX.Element => {
    const { CategoryId, Month, Year } = useLocalSearchParams<{ CategoryId: string; Month: string; Year: string }>()

    const date = new Date(Number(Year), Number(Month) - 1, 1)
    const numericCategoryId = Number(CategoryId)

    const { category, expenses, period, budgetAmount, result, valuta, error, loading } = useCategoryDetails({ date, categoryId: numericCategoryId })
    const { } = useUpdateCategory({category, expenses, period})
    const { currentTheme } = useThemeContext()
    const styles = styles_categoryDetails(currentTheme)

    if (loading) return <ActivityIndicator />
    if (error) return <Text style={styles.errorMessage}>{error}</Text>
    if (!category || !result) return <Text>Invalid category or result</Text>

    return (
        <SafeAreaView style={styles.container}>
            <Title text={category.name} />
            <SubTitle
                text={`${valuta}${result.totalSpent.toFixed(2)} / ${valuta}${budgetAmount.toFixed(2)}`}
            />
            <Text style={styles.titleText}>
                Status: {ConvertToPercentage(result.totalSpent, budgetAmount).toFixed(2)}%
            </Text>
            <Text style={styles.titleText}>Expenses</Text>

            <ScrollView contentContainerStyle={styles.categoryList}>
                <ExpensePanel expenses={expenses} category={category} />
                <Button
                    text="Back"
                    onPress={() =>
                        router.push({
                            pathname: '/add/[categoryId]/[categoryName]',
                            params: { categoryId: category.id, categoryName: category.name },
                        })
                    }
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoryDetails
