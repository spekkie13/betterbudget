import React, {useCallback, useMemo, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ExpenseDetailModal from "@/app/components/UI/Expense/ExpenseDetailModal";
import {preferenceStore} from "@/hooks";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_categoryDetails} from "@/styles/tabs/category/styles_categoryDetails";
import {ExpensePanelProps} from "@/types/props";

const ExpensePanel = ({ expenses, category}: ExpensePanelProps) => {
    const valuta = preferenceStore.get('valuta').stringValue
    const [modalVisible, setModalVisible] = useState<number | null>(null)
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryDetails(currentTheme), [currentTheme])

    const filteredExpenses = useMemo(() =>
        expenses.filter(e => e.categoryId === category.id),
        [expenses, category.id]
    )

    const formatDate = useCallback((date: Date) => {
        const d = new Date(date)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }, [])

    const formattedExpenses = useMemo(() =>
        filteredExpenses.map(expense => ({
            id: expense.id,
            label: `${valuta}${expense.amount.toFixed(2).padEnd(8, ' ')} ${formatDate(new Date(expense.date))} - ${expense.description}`
        })),
        [filteredExpenses, valuta]
    )

    return(
        <View>
            {formattedExpenses.map(({ id, label }, i) => (
                <View key={i}>
                    <TouchableOpacity onPress={() => setModalVisible(id)}>
                        <View style={styles.expenseItemView}>
                            <FontAwesome
                                name={'minus'}
                                size={16}
                                color={currentTheme.colors.textColor}
                            />
                            <Text style={styles.expenseItemText}>{label}</Text>
                        </View>
                    </TouchableOpacity>
                    <ExpenseDetailModal
                        visible={modalVisible === id}
                        onClose={() => setModalVisible(null)}
                        data={expenses.find(e => e.id === id)!}
                        valuta={valuta}
                    />
                </View>
            ))}
        </View>
    )
}

export default ExpensePanel
