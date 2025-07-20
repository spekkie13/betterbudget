import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "@/app/ctx";
import {Expense, Income} from "@/types/models";
import {createNewExpense, createNewIncome} from "@/api";
import {genericFailureMessage, successCreateMessage} from "@/constants";
import {useCategories} from "@/hooks/useCategories";

export function useAddTransaction() {
    const { userState } = useContext(AuthContext)
    const { categoriesState } = useCategories({selectedOnly: false})

    const [transactionState, setTransactionState] = useState({
        date: '',
        amount: '',
        description: '',
        pickerItems: [],
        selectedValue: undefined,
        message: '',
        status: true,
    })

    const updateField = useCallback((fieldName: string) => (value: string) => {
        setTransactionState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }, []);

    function showMessage(msg: string) {
        setTransactionState(prev => ({
            ...prev,
            message: msg,
        }))
        setTimeout(() => setTransactionState(prev => ({
            ...prev,
            message: null,
        })), 3000);
    }

    useEffect(() => {
        const fetchData = async () => {
            const formattedItems = categoriesState.categories.map(item => ({
                label: item.name,
                value: item.id
            }))
            setTransactionState(prev => ({
                ...prev,
                pickerItems: formattedItems,
            }))
        }

        fetchData()
    }, [categoriesState.categories])

    const addNewExpense = async (): Promise<boolean> => {
        if (!transactionState.date ||
            !transactionState.amount ||
            !transactionState.description ||
            !transactionState.pickerItems
        ) {
            setTransactionState(prev => ({
                ...prev,
                status: false
            }))
            showMessage("Please fill in the required information")
            return
        } else {
            const [day, month, year] = transactionState.date.split("-").map(Number)
            const data = {
                id: 0,
                description: transactionState.description,
                categoryId: Number(transactionState.selectedValue),
                amount: parseFloat(transactionState.amount),
                date: new Date(year, month - 1, day).toISOString(),
                userId: Number(userState?.user?.id),
                isRecurring: false
            }
            const expense = new Expense(data)
            const success = await createNewExpense(expense)

            if (success) {
                setTransactionState(prev => ({
                    ...prev,
                    selectedValue: '',
                    date: '',
                    description: '',
                    amount: '',
                    status: success
                }))
                showMessage(successCreateMessage)

            } else {
                setTransactionState(prev => ({
                    ...prev,
                    status: false
                }))
                showMessage(genericFailureMessage)
            }
        }
    }

    const addNewIncome = async () => {
        if (!transactionState.date || !transactionState.amount || !userState?.user?.id) {
            setTransactionState(prev => ({
                ...prev,
                status: false
            }))
            showMessage("Please fill in the required information")
            return
        } else {
            const [day, month, year] = transactionState.date.split("-").map(Number)
            const data = {
                id: 0,
                amount: parseFloat(transactionState.amount),
                date: new Date(year, month - 1, day).toISOString(),
                userId: Number(userState?.user?.id),
            }
            const income = new Income(data)
            const success = await createNewIncome(income)

            if (success) {
                setTransactionState(prev => ({
                    ...prev,
                    date: '',
                    amount: '',
                    status: success
                }))
                showMessage(successCreateMessage)
            } else {
                setTransactionState(prev => ({
                    ...prev,
                    status: false
                }))
                showMessage(genericFailureMessage)
            }
        }
    }

    return {
        transactionState, updateField,
        addNewExpense, addNewIncome,
    }
}
