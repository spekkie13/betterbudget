import React, {useState} from 'react'
import {useRouter} from "expo-router"
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {Title, Logo, Button} from '@/app/components/General'

import CategoryInfoPanel from "@/app/components/UI/Category/CategoryInfoPanel"
import {genericFailureMessage} from "@/constants"
import {styles_home} from "@/styles/styles_home"
import { useThemeContext } from '@/theme/ThemeContext'
import {useSpendingRoom, preferenceStore, usePreferences} from "@/hooks"
import StartingAmountDialog from "@/app/components/UI/StartingAmountDialog";

const HomeScreen = () => {
    const { loading, error, spendingRoom, username } = useSpendingRoom()
    const valuta: string = preferenceStore.get('valuta')?.stringValue ?? "$"

    const router = useRouter()
    const {currentTheme} = useThemeContext()
    const styles = styles_home(currentTheme)
    const { startingAmount } = usePreferences()
    const [startingAmountDialogVisible, setStartingAmountDialogVisible] = useState<boolean>(startingAmount === 0)

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
            {startingAmount === 0 && (
                <StartingAmountDialog
                    visible={startingAmountDialogVisible}
                    onClose={() => setStartingAmountDialogVisible(false)}
                />
            )}
            <View style={styles.header}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={() => router.push('/home/EditBudgets')}
                        style={styles.headerText}
                        >
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
                            {valuta} {spendingRoom.toFixed(2).toLocaleString()}
                        </Text>
                    </TouchableOpacity>
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
