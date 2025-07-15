import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ExpenseDetailModal from "@/app/components/UI/Expense/ExpenseDetailModal";
import {Expense} from "@/models/expense";
import { Category } from "./UI/Category/CategorySlotPicker";
import {preferenceStore} from "@/hooks/preferenceStore";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_categoryDetails} from "@/styles/tabs/category/styles_categoryDetails";

interface ExpensePanelProps {
    expenses: Expense[]
    category: Category
}

const ExpensePanel = ({ expenses, category}: ExpensePanelProps) => {
    const valuta = preferenceStore.get('valuta').stringValue
    const [modalVisible, setModalVisible] = useState<number | null>(null)
    const { currentTheme } = useThemeContext()
    const styles = styles_categoryDetails(currentTheme)

    const render = []
    expenses
        .filter(e => e.categoryId === category.id)
        .map((expense, i) => {
            const padded = expense.amount.toFixed(2).padEnd(8, ' ')
            const date = new Date(expense.date)
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
            const label = `${valuta}${padded} ${formattedDate} - ${expense.description}`

            render.push(
                <View key={i}>
                    <TouchableOpacity onPress={() => setModalVisible(expense.id)}>
                        <View style={styles.expenseItemView}>
                            <FontAwesome name={'minus'} size={16} color={currentTheme.colors.textColor}/>
                            <Text style={styles.expenseItemText}>{label}</Text>
                        </View>
                    </TouchableOpacity>
                    <ExpenseDetailModal
                        visible={modalVisible === expense.id}
                        onClose={() => setModalVisible(null)}
                        data={expense}
                        valuta={valuta}
                    />
                </View>
            )
        })

    return(
        <View>
            {render}
        </View>
    )
}

export default ExpensePanel;
