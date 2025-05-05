import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { TextInput } from 'react-native-paper'
import React, {useContext, useEffect, useState} from 'react'
import Title from '@/app/general/Title'
import {addNewExpense, fetchAllExpensesByUser} from "@/api/ExpenseController"
import {Expense} from "@/models/expense"
import {fetchCategories} from "@/api/CategoryController"
import RNPickerSelect from 'react-native-picker-select'
import {Category} from "@/models/category"
import {pickerSelectStyles, styles_AddExpense} from "@/styles/styles_addExpense"
import {AuthContext} from "@/app/ctx"
import {Link} from "expo-router"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import {DateObj} from "@/models/dateObj";
import {FetchDateByMonthAndYear} from "@/api/DateController";
import {Create} from "@/helpers/ExpenseHelpers";
import {FetchIncomes} from "@/api/IncomeController";
import {genericFailureMessage, successCreateMessage} from "@/constants/MessagesConstants";
import CustomButton from "@/app/general/CustomButton";

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

    const { user } = useContext(AuthContext)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_AddExpense(currentTheme)

    useEffect(() => {
        const fetchData = async () => {
            const Categories : Category[] = await fetchCategories(user.id)
            const formattedItems = Categories.map(item => ({
                label: item.name,
                value: item.id
            }))
            setPickerItems(formattedItems)
        }

        fetchData()
    }, [])

    const AddNewExpense = async (): Promise<void> => {
        if(!date || !amount || !description || !pickerItems){
            ShowErrorMessage("Please fill in the required information")
            return
        }else{
            const selectedDate : DateObj = await FetchDateByMonthAndYear(Number.parseInt(date.split('-')[1]), Number.parseInt(date.split('-')[2]))
            const helpDate = {
                id: selectedDate.id,
                day: Number.parseInt(date.split('-')[0]),
                month: selectedDate.month,
                year: selectedDate.year,
            }
            const newExpenseId = await genExpenseId()
            const data = {
                id: newExpenseId,
                date: new DateObj(helpDate),
                amount: Number.parseFloat(amount),
                description: description,
                categoryId: selectedValue,
                isRecurring: false,
                userId: user.id,
            }
            const expense = new Expense(data)
            const newExpense = Create(expense)
            const success = await addNewExpense(newExpense)

            if (success) {
                ShowSuccessMessage(successCreateMessage)
                setSelectedValue(null)
                setDate('')
                setDescription('')
                setAmount('')
            }else{
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
            <Title text={'Add Expense'} />
            {successMessageVisible && (
                <View>
                    <Text style={{color: currentTheme.colors.successColor}}>
                        {successSubmissionMessage}
                    </Text>
                </View>
            )}
            {errorMessageVisible && (
                <View>
                    <Text style={{color: currentTheme.colors.failureColor}}>
                        {errorSubmissionMessage}
                    </Text>
                </View>
            )}
            <View style={{alignItems: 'center'}}>
                {/*/!*TODO: FIND CALENDAR PICKER???*!/*/}
                <View style={styles.view}>
                    <TextInput
                        style={styles.input}
                        label={'date'}
                        placeholder="(dd-MM-yyyy)"
                        textAlign={'center'}
                        keyboardType={'numeric'}
                        value={date}
                        placeholderTextColor={currentTheme.colors.textColor}
                        onChangeText={text => {
                            setDate(text)
                        }}
                    />
                </View>
                <View style={styles.view}>
                    <TextInput
                        style={styles.input}
                        label={`amount`}
                        keyboardType={'numeric'}
                        textAlign={'center'}
                        value={amount}
                        placeholderTextColor={currentTheme.colors.textColor}
                        onChangeText={text => {
                            setAmount(text)
                        }}
                    />
                </View>
                <View style={styles.view}>
                    <TextInput
                        style={styles.input}
                        label={'description'}
                        textAlign={'center'}
                        value={description}
                        placeholderTextColor={currentTheme.colors.textColor}
                        onChangeText={text => {
                            setDescription(text)
                        }}
                    />
                </View>
                <View style={styles.view}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={pickerItems}
                        placeholder={{label: 'Select a category...', value: null}}
                        style={pickerSelectStyles(currentTheme)}/>
                </View>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={AddNewExpense}
                    >
                        <CustomButton text={'ADD'} color=""/>
                    </TouchableOpacity>
                    <View style={{paddingBottom: 5}}>
                        <Link href={"/(tabs)/expense/"}>
                            <CustomButton text='Back' color=""/>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )

    async function genExpenseId() : Promise<number> {
        const expenses : Expense[] = await fetchAllExpensesByUser(user.id)
        const incomes : Expense[] = await FetchIncomes(user.id)

        const allItems : Expense[] = expenses.concat(incomes)
        const highestId : number = Math.max(...allItems.map(item => item.id))
        return highestId + 1
    }
}

export default AddExpense
