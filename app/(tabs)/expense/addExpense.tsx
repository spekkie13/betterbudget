import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { TextInput } from 'react-native-paper'
import React, {useContext, useEffect, useState} from 'react'
import Title from '@/app/general/Title'
import {createNewExpense} from "@/api/ExpenseController"
import {Expense} from "@/models/expense"
import {getCategories} from "@/api/CategoryController"
import RNPickerSelect from 'react-native-picker-select'
import {Category} from "@/models/category"
import {pickerSelectStyles, styles_AddExpense} from "@/styles/styles_addExpense"
import {AuthContext} from "@/app/ctx"
import {Link} from "expo-router"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
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
            const Categories : Category[] = await getCategories(user.id)
            const formattedItems = Categories.map(item => ({
                label: item.name,
                value: item.id
            }))
            setPickerItems(formattedItems)
        }

        fetchData()
    }, [user.id])

    const AddNewExpense = async (): Promise<void> => {
        if(!date || !amount || !description || !pickerItems){
            ShowErrorMessage("Please fill in the required information")
            return
        }else{
            const [day, month, year] = date.split("-").map(Number);
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
                        placeholder={{label: 'Select a category...', value: ''}}
                        style={pickerSelectStyles(currentTheme)}/>
                </View>
                <View style={styles.addButtonView}>
                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={AddNewExpense}
                    >
                        <CustomButton text={'ADD'} color=""/>
                    </TouchableOpacity>
                    <View style={styles.backButtonView}>
                        <Link href={"/(tabs)/expense/"}>
                            <CustomButton text='Back' color=""/>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddExpense
