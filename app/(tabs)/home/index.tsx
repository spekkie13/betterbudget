import {ActivityIndicator, ColorSchemeName, ScrollView, Text, useColorScheme, View} from 'react-native'
import Title from '@/app/general/Title'
import Logo from '@/app/general/Logo'
import SubTitle from '@/app/general/SubTitle'
import React, {useCallback, useContext, useState} from 'react'
import {AuthContext} from "@/app/ctx"
import CategoryInfoPanel from "@/app/(tabs)/category/CategoryInfoPanel";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {Link, router, useFocusEffect} from "expo-router";
import {genericFailureMessage} from "@/constants/messageConstants";
import CustomButton from "@/app/general/CustomButton";
import {styles_home} from "@/styles/styles_home";
import {getUserPreferenceByName} from "@/api/PreferenceController";
import {determineSpendingRoom} from "@/api/BudgetController";
import {UserPreference} from "@/models/userPreference";

const HomeScreen = () => {
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [valuta, setValuta] = useState("$")

    const colorScheme : ColorSchemeName = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_home(currentTheme)
    const [spendingRoom, setSpendingRoom] = useState(0)

    useFocusEffect(
        useCallback(() : void => {
            const fetchData = async () : Promise<void> => {
                setLoading(true)
                if(!user){
                    router.replace('/sign-in')
                    return
                }
                try {
                    const sum : number = await determineSpendingRoom(user.id)
                    const valutaPref : UserPreference = await getUserPreferenceByName(user.id, "Valuta")
                    const valuta : string = valutaPref?.stringValue ?? "$"
                    setValuta(valuta)
                    setSpendingRoom(sum)
                } catch (err) {
                    console.log(err)
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        }, [user])
    )

    if (loading)
        return <ActivityIndicator/>

    if (error)
        return <Text>Error: {genericFailureMessage}</Text>

    return (
        <ScrollView style={styles.container}>
            <View>
                <Title text={`Hello, ${user?.username}`}/>
                <SubTitle text={'Welcome to Better Budget'}/>
                <Logo/>
            </View>
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        Bestedingsruimte
                    </Text>
                    <Text
                        style={[styles.spendingRoomText, {color: spendingRoom >= 0 ? currentTheme.colors.successColor : currentTheme.colors.failureColor}]}>
                        {valuta} {spendingRoom.toLocaleString()}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <Link href={'/(tabs)/expense/addExpense'}>
                    <CustomButton text="Add expense" color=""/>
                </Link>
            </View>
            <View style={styles.categoryPanel}>
                <CategoryInfoPanel/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen
