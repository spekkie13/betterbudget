import {ActivityIndicator, Text, useColorScheme, View} from 'react-native'
import preferences from '@/models/preferences'
import {styles_categoryCard} from "@/styles/styles_categoryCard"
import React, {useContext, useEffect, useState} from "react"
import {FetchDistinctDates} from "@/api/DateController"
import {RecentPeriodResult} from "@/models/recentPeriodResult"
import {fetchRecentPeriodResult} from "@/api/RecentPeriodResultsController"
import {PeriodBudget} from "@/models/periodBudget"
import {fetchPeriodBudgetByCategoryIdAndDate} from "@/api/PeriodBudgetController"
import {GetPercentageSpent} from "@/helpers/GeneralHelpers"
import {AuthContext} from "@/app/ctx"
import {Link} from "expo-router"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const CategoryCard = ({category}) => {
  const valuta = preferences.get('Valuta') || ""
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recentPeriods, setRecentPeriods] = useState(null)
  const [recentBudget, setRecentBudget] = useState(0)

  const colorScheme = useColorScheme()
  const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
  const styles = styles_categoryCard(currentTheme)

  useEffect(() => {
    const fetchData = async () => {
      try{
          let distinctPeriods = await FetchDistinctDates(user.id, category.id)
          let idx = distinctPeriods.length - 1
          let periodResult : RecentPeriodResult = await fetchRecentPeriodResult(user?.id, category.id, distinctPeriods[idx])
          let periodBudget : PeriodBudget = await fetchPeriodBudgetByCategoryIdAndDate(user?.id, category.id, distinctPeriods[idx])
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

  return (
      <Link
          style={styles.categoryCard}
          href={`/(tabs)/expense/${category.id}/${category.name}`}>
          <View style={styles.categoryCard}>
            <Text style={styles.categoryName}>{category.name || ''}</Text>
            <Text style={styles.spent}>{valuta || ''} {Number.parseFloat(recentPeriods.spent ? recentPeriods.spent : 0).toFixed(2) || ''} / {valuta || ''} {recentBudget.toFixed(2) || ''}</Text>
            <Text style={styles.status}>Status: {GetPercentageSpent(recentPeriods.spent ? recentPeriods.spent : 0, recentBudget).toFixed(2) || ''}%</Text>
          </View>
      </Link>
  )
}

export default CategoryCard
