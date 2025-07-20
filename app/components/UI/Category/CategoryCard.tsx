import {ActivityIndicator, Text, View} from 'react-native'
import {styles_categoryCard} from "@/styles/tabs/category/styles_categoryCard"
import React, {useEffect, useMemo} from "react"
import {useCategoryDetails, usePeriod, useUpdateCategory} from "@/hooks"
import {CategoryCardProps} from "@/types/props"
import {useThemeContext} from "@/theme/ThemeContext";

const CategoryCard: React.FC<CategoryCardProps> = ({ category } : CategoryCardProps) => {
    const { periodState } = usePeriod({ categoryId: category.id, mostRecent: true })
    const { categoryDetailsState, valuta } = useCategoryDetails({
        categoryId: category.id,
        fetchCategory: false,
        fetchExpenses: true,
        fetchBudget: true,
        fetchResult: true,
        period: periodState.period,
    })

    const { updateResult } = useUpdateCategory({
        category,
        expenses: categoryDetailsState.expenses,
        period: periodState.period,
    })

    const { currentTheme } = useThemeContext()
    // Initialize styles without custom background color first
    const styles = useMemo(() => styles_categoryCard(currentTheme), [currentTheme])

    const periodId = periodState.period?.id
    const categoryId = categoryDetailsState.category?.id
    const expenses = categoryDetailsState.expenses

    useEffect(() => {
        if (periodState.period?.id &&
            category?.id &&
            categoryDetailsState.expenses &&
            categoryDetailsState.budget) {
            updateResult(categoryDetailsState.budget).catch((err) =>
                console.log(`Error updating category ${category.id}: ${err}`)
            )
        }
    }, [periodId, categoryId, expenses]);

    if (periodState.loading || categoryDetailsState.loading)
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    if (periodState.error) return <Text style={styles.errorText}>Error: {periodState.error}</Text>
    if (categoryDetailsState.error) return <Text style={styles.errorText}>Error: {categoryDetailsState.error}</Text>

    const spent = categoryDetailsState?.result?.totalSpent ?? 0
    const percentageSpent = categoryDetailsState?.result?.percentageSpent ?? 0

    // Calculate background color only after we have confirmed data
    const backgroundColor =
        percentageSpent < 33 ? 'green' :
        percentageSpent < 66 ? 'yellow' :
        percentageSpent < 100 ? 'orange' : 'red'

    // Create styles with the background color
    const cardStyles = styles_categoryCard(currentTheme, backgroundColor)

    return (
        <View style={styles.container}>
            <View style={cardStyles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.spent}>
                    {valuta} {spent.toFixed(2)} / {valuta} {categoryDetailsState.budget?.amount?.toFixed(2) ?? "0.00"}
                </Text>
                <Text style={styles.status}>
                    Status: {percentageSpent.toFixed(2)}%
                </Text>
            </View>
        </View>
    )
}

export default CategoryCard
