import React from 'react'
import {useRouter} from "expo-router"
import {ActivityIndicator, ScrollView, Text, View} from 'react-native'
import { Title, Logo, Button } from '@/app/components/General'

import CategoryInfoPanel from "@/app/components/UI/Category/CategoryInfoPanel"
import {genericFailureMessage} from "@/constants"
import {styles_home} from "@/styles/styles_home"
import { useThemeContext } from '@/theme/ThemeContext'
import {useSpendingRoom, preferenceStore} from "@/hooks"

const HomeScreen = () => {
    const { loading, error, spendingRoom, username } = useSpendingRoom()
    const valuta: string = preferenceStore.get('valuta')?.stringValue ?? "$"

    const router = useRouter()
    const {currentTheme} = useThemeContext()
    const styles = styles_home(currentTheme)

    if (loading)
        return <ActivityIndicator/>

    if (error)
        return <Text>Error: {genericFailureMessage}</Text>

    return (
        <ScrollView style={styles.container}>
            <View>
                <Title text={`Hello ${username}`}/>
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
                        {valuta} {spendingRoom}
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
