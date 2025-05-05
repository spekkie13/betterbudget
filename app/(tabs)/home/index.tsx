import {ActivityIndicator, ScrollView, Text, useColorScheme, View} from 'react-native'
import Title from '@/app/general/Title'
import Logo from '@/app/general/Logo'
import SubTitle from '@/app/general/SubTitle'
import React, {useCallback, useContext, useState} from 'react'
import Preferences from '@/models/preferences'
import {AuthContext} from "@/app/ctx"
import CategoryInfoPanel from "@/app/(tabs)/category/CategoryInfoPanel";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {Link, useFocusEffect} from "expo-router";
import {determineSpendingRoom} from "@/api/ApiHelpers";
import {fetchAllExpensesByUser} from "@/api/ExpenseController";
import {FetchIncomes} from "@/api/IncomeController";
import {genericFailureMessage} from "@/constants/MessagesConstants";
import {Expense} from "@/models/expense";
import CustomButton from "@/app/general/CustomButton";
import {styles_home} from "@/styles/styles_home";

const HomeScreen = () => {
    const cardsShown: string = Preferences.get('Cards on Home Page')
    const Valuta: string = Preferences.get('Valuta')
    const title: string = 'Top ' + cardsShown + ' categories'
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_home(currentTheme)
    const [spendingRoom, setSpendingRoom] = useState(0)

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const expenses : Expense[] = await fetchAllExpensesByUser(user.id)
                    const incomes : Expense[] = await FetchIncomes(user.id)
                    const sum : number = await determineSpendingRoom(expenses, incomes)
                    setSpendingRoom(sum)
                } catch (err) {
                    console.log(err)
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        }, [user?.id])
    )

    if (loading)
        return <ActivityIndicator />

    if (error)
        return <Text>Error: {genericFailureMessage}</Text>

    return (
        <ScrollView style={styles.container}>
            <View>
                <Title text={`Hello, ${user?.username}`}/>
                <SubTitle text={'Welcome to Better Budget'} />
                <Logo />
            </View>
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        Bestedingsruimte
                    </Text>
                    <Text style={[styles.spendingRoomText, {color: spendingRoom >= 0 ? currentTheme.colors.successColor : currentTheme.colors.failureColor}]}>
                        {Valuta} {spendingRoom.toLocaleString()}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <Link href={'/(tabs)/expense/addExpense'}>
                    <CustomButton text="Add expense" color=""/>
                </Link>
            </View>
            <View style={styles.categoryPanel}>
                <SubTitle text={title} />
                <CategoryInfoPanel />
            </View>
        </ScrollView>
    )
}

export default HomeScreen
