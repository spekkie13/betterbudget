import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import Title from '@/app/general/Title'
import SubTitle from '@/app/general/SubTitle'
import React, {useContext, useEffect, useState} from 'react'
import preferences from "@/models/preferences"
import {styles_categoryDetails} from "@/styles/styles_categoryDetails"
import {fetchExpensesByCategoryIdAndDate} from "@/api/ExpenseController"
import {GetPercentageSpent} from "@/helpers/GeneralHelpers"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {fetchCategoryById, updateCategory} from "@/api/CategoryController"
import {Category} from "@/models/category"
import {DateObj} from "@/models/dateObj"
import {Expense} from "@/models/expense"
import {PeriodBudget} from "@/models/periodBudget"
import {fetchPeriodBudgetByCategoryIdAndDate} from "@/api/PeriodBudgetController"
import {RecentPeriodResult} from "@/models/recentPeriodResult"
import {fetchRecentPeriodResult} from "@/api/RecentPeriodResultsController"
import ExpenseDetailModal from "@/app/(tabs)/expense/ExpenseDetailModal"
import {AuthContext} from "@/app/ctx"
import {useLocalSearchParams, useRouter} from "expo-router"
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import CustomButton from "@/app/general/CustomButton";

const CategoryDetails = () : React.JSX.Element => {
    const router = useRouter()
    const valuta: string = preferences.get('Valuta') || '$'
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expenses, setExpenses] = useState([])
    const [recentBudget, setRecentBudget] = useState(0)
    const [recentPeriod, setRecentPeriodResult] = useState(null)
    const [modalVisible, setModalVisible] = useState(null)
    const { user } = useContext(AuthContext)
    const { CategoryId, Day, Month, Year } = useLocalSearchParams<{CategoryId: string, Day: string, Month: string, Year: string}>()
    const [Category, setCategory] = useState(null)
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryDetails(currentTheme)

    const date = {
        id: 0,
        day: Number.parseInt(Day),
        month: Number.parseInt(Month),
        year: Number.parseInt(Year)
    }
    const dateObj = new DateObj(date)

    useEffect(() => {
        const fetchData = async () : Promise<void> => {
            try {
                const cat : Category = await fetchCategoryById(user.id, Number.parseInt(CategoryId))
                const expensesByDate : Expense[] = await fetchExpensesByCategoryIdAndDate(user.id, cat.id, dateObj)
                const periodBudget : PeriodBudget = await fetchPeriodBudgetByCategoryIdAndDate(user.id, cat.id, dateObj)
                const periodResult : RecentPeriodResult = await fetchRecentPeriodResult(user.id, cat.id, dateObj)

                if (!Number.isNaN(periodResult.spent)) {
                    periodResult.percentage_spent = (periodResult.spent / periodBudget.budget) * 100
                }else{
                    periodResult.percentage_spent = 0
                }
                setCategory(cat)
                setRecentBudget(periodBudget.budget)
                setRecentPeriodResult(periodResult)
                setExpenses(expensesByDate)
            } catch (err) {
                console.error(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    const expenseList : React.JSX.Element[] = expenses.map((expense : Expense, i : number) : React.JSX.Element | null => {
        if (expense.categoryId === Number.parseInt(CategoryId) && expense.categoryId != null) {
            const maxLength : number = Math.max(...expenses.map(expenseItem => expenseItem.amount.toString().length))
            const text : string = `${valuta}${expense.amount.toFixed(2).padEnd(maxLength + 10, '\t')}${expense.date.day}-${expense.date.month}-${expense.date.year} - ${expense.description}`
            return (
                <View key={i}>
                    <TouchableOpacity key={i} onPress={() => setModalVisible(expense.id)}>
                        <View style={styles.expenseItemView}>
                            <FontAwesome name={'minus'} size={16} color={currentTheme.colors.textColor}/>
                            <Text style={styles.expenseItemText}>{text}</Text>
                        </View>
                    </TouchableOpacity>

                    <ExpenseDetailModal
                        visible={modalVisible === expense.id}
                        onClose={() => setModalVisible(null)}
                        data={expense}
                        valuta={valuta}/>
                </View>
            )
        }
        return null
    })

    const Back = async () : Promise<void> => {
        updateCategory(Category).then(() : void => {
            router.back()
        })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Title text={Category.name} />
                <SubTitle text={`${valuta}${Number.parseFloat(recentPeriod.spent).toFixed(2)} / ${valuta}${recentBudget}`} />
                <Text style={styles.titleText}>Status: {GetPercentageSpent(recentPeriod.spent, recentBudget).toFixed(2)}%</Text>
                <Text style={styles.titleText}>Expenses</Text>
                <ScrollView contentContainerStyle={styles.categoryList}>
                    <View>{expenseList}</View>
                    <TouchableOpacity
                        onPress={Back}
                        style={styles.backButton}>
                        <CustomButton text={'Back'} color={''} />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default CategoryDetails
