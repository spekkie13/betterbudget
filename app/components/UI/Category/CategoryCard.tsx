import {ActivityIndicator, Text, View} from 'react-native'
import {styles_categoryCard} from "@/styles/tabs/category/styles_categoryCard"
import React from "react"
import {useCategoryDetails} from "@/hooks"
import {CategoryCardProps} from "@/types/props"

const CategoryCard: React.FC<CategoryCardProps> = ({ category, theme } : CategoryCardProps) => {
    const { spent, percentageSpent, budgetAmount, valuta, loading, error } = useCategoryDetails({
        categoryId: category.id,
        fetchCategory: false,
        fetchExpenses: false,
        mostRecent: true,
    })

    const styles = styles_categoryCard(theme)

    if (loading) return <ActivityIndicator/>
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>

    return (
        <View style={styles.container}>
            <View style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.spent}>
                    {valuta} {spent.toFixed(2)} / {valuta} {budgetAmount.toFixed(2)}
                </Text>
                <Text style={styles.status}>
                    Status: {percentageSpent.toFixed(2)}%
                </Text>
            </View>
        </View>
    )
}

export default CategoryCard
