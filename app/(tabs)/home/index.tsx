import {ActivityIndicator, ScrollView, Text, View} from 'react-native'
import Title from '@/app/components/Text/Title'
import Logo from '@/app/components/UI/General/Logo'
import React, {useCallback, useContext, useState} from 'react'
import {AuthContext} from "@/app/ctx"
import CategoryInfoPanel from "@/app/components/UI/Category/CategoryInfoPanel"
import {useRouter, useFocusEffect} from "expo-router"
import {genericFailureMessage} from "@/constants/messageConstants"
import {styles_home} from "@/styles/styles_home"
import {determineSpendingRoom} from "@/api/BudgetController"
import {preferenceStore} from "@/hooks/preferenceStore"
import { useThemeContext } from '@/theme/ThemeContext'
import Button from "@/app/components/UI/General/Button";

const HomeScreen = () => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
    const {currentTheme} = useThemeContext()
    const styles = styles_home(currentTheme)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [spendingRoom, setSpendingRoom] = useState(0)

    const valuta: string = preferenceStore.get('valuta')?.stringValue ?? "$"

    useFocusEffect(
        useCallback((): void => {
            const fetchData = async (): Promise<void> => {
                setLoading(true)
                if (!user) {
                    router.replace('/sign-in')
                    return
                }
                try {
                    const sum: number = await determineSpendingRoom(user.id)
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
                <Title text={`Hello ${user?.username}`}/>
                <Logo/>
            </View>
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        Bestedingsruimte
                    </Text>
                    <Text
                        style={[
                            styles.spendingRoomText,
                            {
                                color:
                                    spendingRoom >= 0
                                        ? currentTheme.colors.successColor
                                        : currentTheme.colors.failureColor
                            }
                        ]}
                    >
                        {valuta} {spendingRoom.toLocaleString()}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <Button
                    text='Add Expense'
                    onPress={() => router.push('/(tabs)/add/addExpense')} />
            </View>
            <View style={styles.categoryPanel}>
                <CategoryInfoPanel theme={currentTheme}/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen
