import {ActivityIndicator, Text, View} from 'react-native'
import {styles_categoryCard} from "@/styles/tabs/category/styles_categoryCard"
import React, {useEffect} from "react"
import {useCategoryDetails, usePeriod, useUpdateCategory} from "@/hooks"
import {CategoryCardProps} from "@/types/props"

const CategoryCard: React.FC<CategoryCardProps> = ({ category, theme } : CategoryCardProps) => {
    const { period } = usePeriod({ category: category, mostRecent: true })
    const {
        spent,
        percentageSpent,
        budget,
        valuta,
        loading,
        error,
        expenses
    } = useCategoryDetails({
        categoryId: category.id,
        fetchCategory: false,
        fetchExpenses: true,
        period: period,
    })

    const { updateResult } = useUpdateCategory({
        category,
        expenses,
        period,
    })

    const styles = styles_categoryCard(theme)

    useEffect(() => {
        if (period?.id && category?.id && expenses && budget) {
            updateResult(budget).catch((err) =>
                console.log(`Error updating category ${category.id}: ${err}`)
            )
        }
        // we only want to update when the definitive data is available:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period?.id, category?.id, expenses]);

    if (loading) return <ActivityIndicator/>
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>

    return (
        <View style={styles.container}>
            <View style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.spent}>
                    {valuta} {spent.toFixed(2)} / {valuta} {budget.amount.toFixed(2)}
                </Text>
                <Text style={styles.status}>
                    Status: {percentageSpent.toFixed(2)}%
                </Text>
            </View>
        </View>
    )
}

export default CategoryCard
