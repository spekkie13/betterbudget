import React, { useContext, useEffect, useState } from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { styles_categoryDeleteModal } from '@/styles/tabs/category/styles_categoryDeleteModal'
import { deleteCategoryById, getCategories, getBudgetByCategory, updateBudgets, getExpensesByCategory, updateExpenses } from "@/api"
import { Budget } from "@/types/models"
import { AuthContext } from "@/app/ctx"
import {useThemeContext} from "@/theme/ThemeContext"

const CategoryDeleteModal = ({ visible, onClose, categoryId, message }) => {
    const { user } = useContext(AuthContext)
    const [category, setCategory] = useState(null)
    const [expenses, setExpenses] = useState([])

    const { currentTheme } = useThemeContext()
    const styles = styles_categoryDeleteModal(currentTheme)

    useEffect(() => {
        const loadCategoryData = async () => {
            const [cat, exp] = await Promise.all([
                getCategories(categoryId),
                getExpensesByCategory(user.id, categoryId),
            ])
            setCategory(cat)
            setExpenses(exp)
        }

        if (visible) loadCategoryData()
    }, [visible, categoryId, user.id])

    const deleteCategory = async () => {
        if (!category) return

        const isOtherCategory = category.name === "Overig"
        if (isOtherCategory) return onClose()

        if (expenses.length > 0) {
            const categories = await deleteCategoryById(user.id)
            const otherCategory = categories.find((c) => c.name === "Overig")
            if (!otherCategory) return

            const newCategoryId = otherCategory.id

            const expenseUpdated = await updateExpenses(expenses, newCategoryId)
            if (expenseUpdated) {
                const budgets: Budget[] = await getBudgetByCategory(user.id, category.id)
                const budgetsUpdated = await updateBudgets(budgets, newCategoryId)
                if (budgetsUpdated) {
                    await deleteCategoryById(category.id)
                }
            }
        } else {
            await deleteCategoryById(category.id)
        }

        onClose()
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={deleteCategory} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default CategoryDeleteModal
