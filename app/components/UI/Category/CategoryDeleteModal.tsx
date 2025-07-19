import React, {useContext, useEffect, useMemo, useState} from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { styles_categoryDeleteModal } from '@/styles/tabs/category/styles_categoryDeleteModal'
import {
    deleteCategoryById,
    getBudgetByCategory,
    updateBudgets,
    getExpensesByCategory,
    updateExpenses,
    getCategoryById
} from "@/api"
import {Budget, Category, Expense} from "@/types/models"
import { AuthContext } from "@/app/ctx"
import {useThemeContext} from "@/theme/ThemeContext"
import {CategoryProps} from "@/types/props/CategoryProps";

const CategoryDeleteModal = React.memo(({ visible, onClose, categoryId, message } : CategoryProps) => {
    const { userState } = useContext(AuthContext)
    const user = userState.user

    const [categoryDeleteState, setCategoryDeleteState] = useState({
        category: null as Category | null,
        expenses: null as Expense[] | null
    })

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryDeleteModal(currentTheme), [currentTheme])
    const userId = user?.id

    useEffect(() => {
        const loadCategoryData = async () => {
            const [cat, exp] = await Promise.all([
                getCategoryById(user.id, categoryId),
                getExpensesByCategory(user.id, categoryId),
            ])
            setCategoryDeleteState({
                expenses: exp,
                category: cat
            })
        }

        if (visible) loadCategoryData()
    }, [visible, categoryId, userId])

    const deleteCategory = async () => {
        if (!categoryDeleteState.category) return

        const isOtherCategory = categoryDeleteState.category.name === "Overig"
        if (isOtherCategory) return onClose()

        if (categoryDeleteState.expenses.length > 0) {
            const categories = await deleteCategoryById(user.id)
            const otherCategory = categories.find((c) => c.name === "Overig")
            if (!otherCategory) return

            const newCategoryId = otherCategory.id

            const expenseUpdated = await updateExpenses(categoryDeleteState.expenses, newCategoryId)
            if (expenseUpdated) {
                const budgets: Budget[] = await getBudgetByCategory(userId, categoryDeleteState.category.id)
                const budgetsUpdated = await updateBudgets(budgets, newCategoryId)
                if (budgetsUpdated) {
                    await deleteCategoryById(categoryDeleteState.category.id)
                }
            }
        } else {
            await deleteCategoryById(categoryDeleteState.category.id)
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
})

export default CategoryDeleteModal
