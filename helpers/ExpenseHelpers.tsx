import {Expense} from "@/models/expense"
import {dbExpense} from "@/models/dbExpense"

export function Create(expense : Expense){
    const date : Date = new Date(expense.date.year, expense.date.month - 1, expense.date.day)
    const expenseData = {
        id: expense.id,
        date: date,
        amount: expense.amount,
        description: expense.description,
        categoryId: expense.categoryId,
        isRecurring: expense.isRecurring,
        userId: expense.userId,
    }

    return new dbExpense(expenseData)
}
