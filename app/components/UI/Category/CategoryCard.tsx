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
        period: periodState.period,
    })

    const { updateResult } = useUpdateCategory({
        category,
        expenses: categoryDetailsState.expenses,
        period: periodState.period,
    })

    const { currentTheme } = useThemeContext()
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
        // we only want to update when the definitive data is available:
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return (
        <View style={styles.container}>
            <View style={styles.categoryCard}>
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
