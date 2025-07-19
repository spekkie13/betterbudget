import React, {useMemo, useState} from 'react'
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
    const router = useRouter()

    const {currentTheme} = useThemeContext()
    const styles = useMemo(() => styles_home(currentTheme), [currentTheme])

    const { preferenceState } = usePreferences()
    const { spendingRoomState, username } = useSpendingRoom()
    const valuta: string = preferenceStore.get('valuta')?.stringValue ?? "$"
    const [startingAmountDialogVisible, setStartingAmountDialogVisible] = useState<boolean>(preferenceState.startingAmount === 0)

    if (spendingRoomState.loading)
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )

    if (spendingRoomState.error)
        return <Text>Error: {genericFailureMessage}</Text>

    return (
        <ScrollView style={styles.container}>
            <View>
                <Title text={`Hello ${username}`}/>
                <Logo/>
            </View>
            {preferenceState.startingAmount === 0 && (
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
                                        spendingRoomState.spendingRoom >= 0
                                            ? currentTheme.colors.successColor
                                            : currentTheme.colors.failureColor
                                }
                            ]}
                        >
                            {valuta} {spendingRoomState.spendingRoom.toFixed(2).toLocaleString()}
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
                <CategoryInfoPanel />
            </View>
        </ScrollView>
    )
}

export default HomeScreen
