import React, {useCallback, useMemo, useState} from 'react'
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {styles_expenseMonthSelection} from '@/styles/tabs/expense/styles_expenseMonthSelection'

import { Title, Button } from '@/app/components/General'
import CategoryDeleteModal from '@/app/components/UI/Category/CategoryDeleteModal'
import CategoryEditModal from '@/app/components/UI/Category/CategoryEditModal'
import MonthsExpensePanel from "@/app/components/UI/Expense/MonthsExpensePanel";

import {useThemeContext} from "@/theme/ThemeContext"
import {usePeriods} from "@/hooks";

const MonthSelection = () => {
    const router = useRouter()
    const {categoryId, categoryName} = useLocalSearchParams<{ categoryId: string; categoryName: string }>()
    const { periodsState } = usePeriods({categoryId, categoryName})

    const [editModalVisible, setEditModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_expenseMonthSelection(currentTheme), [currentTheme])

    const handleEdit = () => setEditModalVisible(true)
    const handleDelete = () => setDeleteModalVisible(true)

    const closeAndNavigateBack = () => {
        setEditModalVisible(false)
        setDeleteModalVisible(false)
        router.back()
    }

    const handleBack = useCallback(() => {
        router.replace('/(tabs)/category')
    }, [router])

    if (periodsState.loading)
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    if (periodsState.error) return <Text style={styles.errorMessage}>Error: {periodsState.error}</Text>

    return (
        <View style={styles.container}>
            <Title text={categoryName}/>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <MonthsExpensePanel categoryId={categoryId} groupedDates={periodsState.groupedDates}/>

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={handleEdit} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="pencil" size={20} style={styles.icon}/>
                            <Text style={styles.text}>Edit Category</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDelete} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="trash" size={20} style={styles.icon}/>
                            <Text style={styles.text}>Delete</Text>
                        </View>
                    </TouchableOpacity>

                    <CategoryDeleteModal
                        visible={deleteModalVisible}
                        onClose={closeAndNavigateBack}
                        categoryId={Number(categoryId)}
                        message={periodsState.deleteMessage}
                    />

                    <CategoryEditModal
                        visible={editModalVisible}
                        onClose={closeAndNavigateBack}
                        categoryId={Number(categoryId)}
                    />
                </View>

                <Button
                    text='Back'
                    onPress={handleBack}/>
            </ScrollView>
        </View>
    )
}

export default MonthSelection
