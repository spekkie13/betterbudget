import {ActivityIndicator, Text, View} from 'react-native'
import {styles_categoryCard} from "@/styles/tabs/category/styles_categoryCard"
import React, {useContext, useEffect, useState} from "react"
import {getMostRecentPeriod} from "@/api/PeriodController"
import {getMostRecentResult} from "@/api/ResultController"
import {getBudgetByCategoryAndDate} from "@/api/BudgetController"
import {ConvertToPercentage} from "@/helpers/GeneralHelpers"
import {AuthContext} from "@/app/ctx"
import {Category} from "@/models/category"
import {Budget} from "@/models/budget"
import {Result} from "@/models/periodresult"
import {useRouter} from "expo-router"
import {preferenceStore} from "@/hooks/preferenceStore"

type Props = {
    category: Category
    theme: any
}

const CategoryCard: React.FC<Props> = ({ category, theme }) => {
    const {user} = useContext(AuthContext)
    const styles = styles_categoryCard(theme)
    const router = useRouter()
    const valutaPref = preferenceStore.get('valuta')
    const valuta = valutaPref.stringValue

    const [state, setState] = useState<{
        loading: boolean
        error: any
        result: Result | null
        budget: Budget | null
    }>({
        loading: true,
        error: null,
        result: null,
        budget: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user){
                    router.replace('/')
                    return
                }

                const period = await getMostRecentPeriod(user.id, category.id)

                const [result, rawBudget] = await Promise.all([
                    getMostRecentResult(user.id, category.id, period.id),
                    getBudgetByCategoryAndDate(user.id, category.id, period.id)
                ])

                const budgetInstance = new Budget(rawBudget)

                setState({
                    loading: false,
                    error: null,
                    result,
                    budget: budgetInstance,
                })
            } catch (err) {
                console.error(err)
                setState(prev => ({...prev, loading: false, error: err}))
            }
        }
        fetchData()
    }, [user, category])

    const {loading, error, result, budget } = state
    const spent = result?.totalSpent ?? 0
    const budgetAmount = budget?.amount ?? 0
    const percentage = ConvertToPercentage(spent, budgetAmount)

    if (loading) return <ActivityIndicator/>
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>

    return (
        <View style={styles.container}>
            <View style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.spent}>
                    {valuta} {spent.toFixed(2)} / {valuta} {budgetAmount.toFixed(2)}
                </Text>
                <Text style={styles.status}>
                    Status: {percentage.toFixed(2)}%
                </Text>
            </View>
        </View>
    )
}

export default CategoryCard
