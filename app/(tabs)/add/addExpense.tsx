import {Text, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Title from '@/app/components/Text/Title'
import {createNewExpense} from "@/api/ExpenseController"
import {Expense} from "@/models/expense"
import {getCategories} from "@/api/CategoryController"
import RNPickerSelect from 'react-native-picker-select'
import {Category} from "@/models/category"
import {pickerSelectStyles, styles_AddExpense} from "@/styles/tabs/expense/styles_addExpense"
import {AuthContext} from "@/app/ctx"
import {useRouter} from "expo-router"
import {genericFailureMessage, successCreateMessage} from "@/constants/messageConstants"
import {useThemeContext} from "@/theme/ThemeContext"
import {InputField} from "@/app/components/UI/InputField";
import Button from "@/app/components/UI/General/Button";

const AddExpense = () => {
    const [pickerItems, setPickerItems] = useState([])
    const [selectedValue, setSelectedValue] = useState(undefined)
    const [date, setDate] = useState('')

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')

    const [successSubmissionMessage, setSuccessSubmissionMessage] = useState('')
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)

    const [errorSubmissionMessage, setErrorSubmissionMessage] = useState('')
    const [errorMessageVisible, setErrorMessageVisible] = useState(false)

    const {user} = useContext(AuthContext)
    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = styles_AddExpense(currentTheme)

    useEffect(() => {
        const fetchData = async () => {
            const Categories: Category[] = await getCategories(user.id)
            const formattedItems = Categories.map(item => ({
                label: item.name,
                value: item.id
            }))
            setPickerItems(formattedItems)
        }

        fetchData()
    }, [user?.id])

    const AddNewExpense = async (): Promise<void> => {
        if (!date || !amount || !description || !pickerItems) {
            ShowErrorMessage("Please fill in the required information")
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
                ShowSuccessMessage(successCreateMessage)
                setSelectedValue('')
                setDate('')
                setDescription('')
                setAmount('')
            } else {
                ShowErrorMessage(genericFailureMessage)
            }
        }
    }

    const ShowSuccessMessage = (message: string) => {
        setSuccessSubmissionMessage(message)
        setSuccessMessageVisible(true)
        setTimeout(() => {
            setSuccessMessageVisible(false)
        }, 3000)
    }

    const ShowErrorMessage = (message: string) => {
        setErrorSubmissionMessage(message)
        setErrorMessageVisible(true)
        setTimeout(() => {
            setErrorMessageVisible(false)
        }, 3000)
    }

    return (
        <View style={styles.container}>
            <Title text={'Add Expense'}/>
            {successMessageVisible && (
                <View>
                    <Text style={styles.successText}>
                        {successSubmissionMessage}
                    </Text>
                </View>
            )}
            {errorMessageVisible && (
                <View>
                    <Text style={styles.failureText}>
                        {errorSubmissionMessage}
                    </Text>
                </View>
            )}
            <View style={styles.addView}>
                <View style={styles.view}>
                    <InputField
                        label={'Date'}
                        placeholder={'dd-MM-yyyy'}
                        onChange={setDate}
                        value={date}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <InputField
                        label={'amount'}
                        onChange={setAmount}
                        value={amount}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <InputField
                        label={'description'}
                        onChange={setDescription}
                        value={description}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={pickerItems}
                        placeholder={{label: 'Select a category...', value: ''}}
                        style={pickerSelectStyles(currentTheme)}/>
                </View>
                <View style={styles.buttonView}>
                    <Button text='Add'
                        onPress={AddNewExpense}
                        style={styles.buttonView}/>

                    <Button text='Back'
                        onPress={() => router.replace('/(tabs)/add')}
                        style={styles.buttonView}/>
                </View>
            </View>
        </View>
    )
}

export default AddExpense
