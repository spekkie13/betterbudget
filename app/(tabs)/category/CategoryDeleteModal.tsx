import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native"
import {styles_categoryDeleteModal} from "@/styles/styles_categoryDeleteModal"
import {deleteCategoryById, fetchCategories} from "@/api/CategoryController"
import {fetchPeriodBudgetByCategoryId, updatePeriodBudgets} from "@/api/PeriodBudgetController"
import {fetchExpensesByCategoryId, updateExpenses} from "@/api/ExpenseController"
import {PeriodBudget} from "@/models/periodBudget"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "@/app/ctx"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const CategoryDeleteModal = ({ visible, onClose, categoryId, message }) => {
    const { user } = useContext(AuthContext)
    const [category, setCategory] = useState(null)
    const [expenses, setExpenses] = useState([])

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryDeleteModal(currentTheme)

    useEffect(() => {
        const fetchData = async () => {
            const cat = await fetchCategories(categoryId)
            const exp = await fetchExpensesByCategoryId(user.id, categoryId)

            setExpenses(exp)
            setCategory(cat)
        }

        fetchData()
    }, [])

    const deleteCategory = async () => {
        if (category.name === 'Overig')
            onClose()

        if (expenses.length > 0){
            const categories = await fetchCategories(user.id)
            const overigCategory = categories.find(c => c.name === 'Overig')
            const newId : number = overigCategory.id

            const updateExpenseStatus = await updateExpenses(expenses, newId)
            if (updateExpenseStatus) {
                const budgetsToUpdate : PeriodBudget[] = await fetchPeriodBudgetByCategoryId(user.id, category.id)
                const updateBudgetStatus = await updatePeriodBudgets(budgetsToUpdate,  newId)
                if (updateBudgetStatus) {
                    await deleteCategoryById(category.id)
                }
            }
        }else{
            await deleteCategoryById(category.id)
        }
        onClose()
    }

    return(
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
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
