import React, {useCallback, useMemo, useState} from 'react'
import {useRouter} from "expo-router"
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {Title, Logo, Button} from '@/app/components/General'

import CategoryInfoPanel from "@/app/components/UI/Category/CategoryInfoPanel"
import {genericFailureMessage} from "@/constants"
import {styles_home} from "@/styles/styles_home"
import { useThemeContext } from '@/theme/ThemeContext'
import {useSpendingRoom, preferenceStore, usePreferences, useCategories} from "@/hooks"
import StartingAmountDialog from "@/app/components/UI/StartingAmountDialog";

const HomeScreen = () => {
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_home(currentTheme), [currentTheme])

    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const { preferenceState } = usePreferences()
    const { spendingRoomState, username } = useSpendingRoom(refreshTrigger)

    const {
        categoriesState: {
            categories: selectedCategories,
            loading: categoriesLoading,
            error: categoriesError
        }
    } = useCategories({
        selectedOnly: true,
        refreshTrigger
    })

    const valuta: string = preferenceStore.get('valuta')?.stringValue ?? "$"
    const [startingAmountDialogVisible, setStartingAmountDialogVisible] = useState<boolean>(
        preferenceState.startingAmount === 0
    )

    const handleStartingAmountChange = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
        setStartingAmountDialogVisible(false)
    }, [])

    const handleEditBudgets = useCallback(() => {
        router.push('/home/EditBudgets')
    }, [router])

    const handleAddExpense = useCallback(() => {
        router.push('/(tabs)/add/addExpense')
    }, [router])

    if (spendingRoomState.loading || categoriesLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={currentTheme.colors.primary} />
            </View>
        )
    }

    if (spendingRoomState.error || categoriesError) {
        return <Text style={styles.text}>Error: {genericFailureMessage}</Text>
    }

    const spendingRoomColor = spendingRoomState.spendingRoom >= 0
        ? currentTheme.colors.successColor
        : currentTheme.colors.failureColor

    return (
        <ScrollView style={styles.container}>
            <View>
                <Title text={`Hello ${username}`} />
                <Logo />
            </View>
            {preferenceState.startingAmount === 0 && (
                <StartingAmountDialog
                    visible={startingAmountDialogVisible}
                    onClose={() => setStartingAmountDialogVisible(false)}
                    onSave={handleStartingAmountChange}
                />
            )}

            <View style={styles.header}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={handleEditBudgets}
                        style={styles.headerText}
                    >
                        <Text style={styles.headerText}>
                            Bestedingsruimte
                        </Text>
                        <Text
                            style={[
                                styles.spendingRoomText,
                                { color: spendingRoomColor }
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
                    onPress={handleAddExpense}
                />
            </View>

            <View style={styles.categoryPanel}>
                <CategoryInfoPanel categories={selectedCategories} />
            </View>
        </ScrollView>
    )
}

export default HomeScreen
