import React, {useState} from 'react'
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useLocalSearchParams, useRouter} from 'expo-router'
import {styles_expenseMonthSelection} from '@/styles/tabs/expense/styles_expenseMonthSelection'

import Title from '@/app/components/Text/Title'
import CategoryDeleteModal from '@/app/components/UI/Category/CategoryDeleteModal'
import CategoryEditModal from '@/app/components/UI/Category/CategoryEditModal'

import {useThemeContext} from "@/theme/ThemeContext"
import Button from "@/app/components/UI/General/Button"
import {usePeriods} from "@/hooks/usePeriods";
import MonthsExpensePanel from "@/app/components/MonthsExpensePanel";

const MonthSelection = () => {
    const router = useRouter()
    const {categoryId, categoryName} = useLocalSearchParams<{ categoryId: string; categoryName: string }>()
    const { loading, error, groupedDates, deleteMessage } = usePeriods({categoryId, categoryName})

    const [editModalVisible, setEditModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const { currentTheme } = useThemeContext()
    const styles = styles_expenseMonthSelection(currentTheme)

    const handleEdit = () => setEditModalVisible(true)
    const handleDelete = () => setDeleteModalVisible(true)

    const closeAndNavigateBack = () => {
        setEditModalVisible(false)
        setDeleteModalVisible(false)
        router.back()
    }

    if (loading) return <ActivityIndicator/>
    if (error) return <Text style={styles.errorMessage}>Error: {error.message}</Text>

    return (
        <View style={styles.container}>
            <Title text={categoryName}/>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <MonthsExpensePanel categoryId={categoryId} groupedDates={groupedDates}/>

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
                        categoryId={categoryId}
                        message={deleteMessage}
                    />

                    <CategoryEditModal
                        visible={editModalVisible}
                        onClose={closeAndNavigateBack}
                        categoryId={categoryId}
                    />
                </View>

                <Button
                    text='Back'
                    onPress={() => router.replace('/(tabs)/category')}/>
            </ScrollView>
        </View>
    )
}

export default MonthSelection
