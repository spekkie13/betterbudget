import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/app/ctx";
import {Expense, Income} from "@/types/models";
import {createNewExpense, createNewIncome} from "@/api";
import {genericFailureMessage, successCreateMessage} from "@/constants";
import {useCategories} from "@/hooks/useCategories";

export function useAddTransaction() {
    const { user } = useContext(AuthContext)
    const { categories } = useCategories({userId: user?.id})

    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [pickerItems, setPickerItems] = useState([])
    const [selectedValue, setSelectedValue] = useState(undefined)

    const [message, setMessage] = useState<string | null>('')

    function showMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    }

    useEffect(() => {
        const fetchData = async () => {
            const formattedItems = categories.map(item => ({
                label: item.name,
                value: item.id
            }))
            setPickerItems(formattedItems)
        }

        fetchData()
    }, [categories])

    const addNewExpense = async (): Promise<boolean> => {
        if (!date || !amount || !description || !pickerItems) {
            showMessage("Please fill in the required information")
            return
        } else {
            const [day, month, year] = date.split("-").map(Number)
            const data = {
                id: 0,
                description: description,
                categoryId: Number(selectedValue),
                amount: parseFloat(amount),
                date: new Date(year, month - 1, day).toISOString(),
                userId: Number(user.id),
                isRecurring: false
            }
            const expense = new Expense(data)
            const success = await createNewExpense(expense)

            if (success) {
                showMessage(successCreateMessage)
                setSelectedValue('')
                setDate('')
                setDescription('')
                setAmount('')
            } else {
                showMessage(genericFailureMessage)
            }
        }
    }

    const addNewIncome = async () => {
        if (!date || !amount || !user?.id) {
            showMessage("Please fill in the required information")
            return
        } else {
            console.log('add new income: ', amount)
            const [day, month, year] = date.split("-").map(Number)
            const data = {
                id: 0,
                amount: parseFloat(amount),
                date: new Date(year, month - 1, day).toISOString(),
                userId: Number(user.id),
            }
            const income = new Income(data)
            const success = await createNewIncome(income)

            if (success) {
                showMessage(successCreateMessage)
                setDate('')
                setAmount('')
            } else {
                showMessage(genericFailureMessage)
            }
        }
    }

    return {
        message,
        date, setDate,
        amount, setAmount,
        description, setDescription,
        selectedValue, setSelectedValue,
        pickerItems,
        addNewExpense, addNewIncome,
    }
}
