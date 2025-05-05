import {ActivityIndicator, Text, useColorScheme, View} from 'react-native'
import preferences from '@/models/preferences'
import React, {useContext, useEffect, useState} from "react"
import {DateObj} from "@/models/dateObj"
import {FetchDistinctDates} from "@/api/DateController"
import {ConvertMonthToName} from "@/helpers/DateHelpers"
import {fetchRecentPeriodResult} from "@/api/RecentPeriodResultsController"
import {RecentPeriodResult} from "@/models/recentPeriodResult"
import {GetPercentageSpent} from "@/helpers/GeneralHelpers"
import {PeriodBudget} from "@/models/periodBudget"
import {fetchPeriodBudgetByCategoryIdAndDate} from "@/api/PeriodBudgetController"
import {AuthContext} from "@/app/ctx"
import {styles_categoryInfoCard} from "@/styles/styles_categoryInfoCard"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const CategoryInfoCard = ({category}) => {
    const valuta = preferences.get('Valuta') || ""
    const { user } = useContext(AuthContext)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryInfoCard(currentTheme)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [recentPeriods, setRecentPeriods] = useState(null)
    const [recentBudget, setRecentBudget] = useState(0)
    const [recentDateObj, setRecentDateObj] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                let distinctPeriods : DateObj[] = await FetchDistinctDates(user.id, category.id)
                const idx = distinctPeriods.length - 1
                setRecentDateObj(distinctPeriods[idx])
                let periodResult : RecentPeriodResult = await fetchRecentPeriodResult(user.id, category.id, distinctPeriods[idx])
                let periodBudget : PeriodBudget = await fetchPeriodBudgetByCategoryIdAndDate(user.id, category.id, distinctPeriods[idx])
                setRecentPeriods(periodResult)
                setRecentBudget(periodBudget.budget)
            }catch (err) {
                console.log(err)
                setError(err)
            }finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading){
        return <ActivityIndicator />
    }

    if (error){
        return <Text>Error: {error.message}</Text>
    }
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.periodName}>{ConvertMonthToName(recentDateObj.month)} {recentDateObj.year}</Text>
                <Text style={styles.status}>{valuta} {Number.parseFloat(recentPeriods.spent).toFixed(2)} / {valuta} {recentBudget.toFixed(2)}</Text>
                <Text style={styles.status}>Status: {GetPercentageSpent(recentPeriods.spent, recentBudget).toFixed(2)}%</Text>
            </View>
        </View>
    )
}

export default CategoryInfoCard
