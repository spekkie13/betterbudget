import React, {useContext, useState} from "react";
import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles_categoryDeleteModal} from "@/styles/tabs/category/styles_categoryDeleteModal";
import {deleteCategoryById, getCategories} from "@/api/CategoryController";
import {getBudgetByCategory, updateBudgets} from "@/api/BudgetController";
import {getExpensesByCategory, updateExpenses} from "@/api/ExpenseController";
import {Budget} from "@/models/budget";
import {AuthContext} from "@/app/ctx";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {useAsyncEffect} from "@/hooks/useAsyncEffect";
import {categoryNameOther} from "@/constants/messageConstants";
import {Category} from "@/models/category";

const CategoryDeleteModal = ({visible, onClose, categoryId, message}) => {
    const {user} = useContext(AuthContext);
    const [category, setCategory] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const colorScheme = useColorScheme();
    const styles = styles_categoryDeleteModal(
        colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme
    );

    useAsyncEffect(async () => {
        if (visible) {
            const [cat, exp] = await Promise.all([
                getCategories(categoryId),
                getExpensesByCategory(user.id, categoryId),
            ]);
            setCategory(cat);
            setExpenses(exp);
        }
    }, [visible, categoryId, user.id])

    const deleteCategory = async () => {
        if (!category) return;

        const isOtherCategory = category.name === categoryNameOther;
        if (isOtherCategory) return onClose();

        if (expenses.length > 0) {
            const categories = await deleteCategoryById(user.id);
            const otherCategory = categories.find((c : Category) => c.name === categoryNameOther);
            if (!otherCategory) return;

            const newCategoryId = otherCategory.id;

            const expenseUpdated = await updateExpenses(expenses, newCategoryId);
            if (expenseUpdated) {
                const budgets: Budget[] = await getBudgetByCategory(user.id, category.id);
                const budgetsUpdated = await updateBudgets(budgets, newCategoryId);
                if (budgetsUpdated) {
                    await deleteCategoryById(category.id);
                }
            }
        } else {
            await deleteCategoryById(category.id);
        }

        onClose();
    };

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
    );
};

export default CategoryDeleteModal;
