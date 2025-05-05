import {Alert, Button, Text, useColorScheme, View, TouchableOpacity} from "react-native"
import { TextInput } from 'react-native-paper'
import {useContext, useState} from "react"
import Title from "@/app/general/Title"
import {Category} from "@/models/category"
import {addNewCategory} from "@/api/CategoryController"
import {insertNewPeriodBudget} from "@/api/PeriodBudgetController"
import {DateObj} from "@/models/dateObj"
import {genericFailureMessage, successCreateMessage} from "@/constants/MessagesConstants"
import {AuthContext} from "@/app/ctx"
import {Link} from "expo-router"
import {createStyles} from "@/styles/styles_addCategory"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import * as React from "react";
import CustomButton from "@/app/general/CustomButton";

const AddCategory = () => {
    const [category, SetCategory] = useState('')
    const [budget, SetBudget] = useState('')
    const { user } = useContext(AuthContext)

    const [successSubmissionMessage, setSuccessSubmissionMessage] = useState('')
    const [successMessageVisible, setSuccessMessageVisible] = useState(false)

    const [errorSubmissionMessage, setErrorSubmissionMessage] = useState('')
    const [errorMessageVisible, setErrorMessageVisible] = useState(false)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = createStyles(currentTheme)

    async function addCategory() : Promise<void>{
        if(!category || !budget){
            ShowErrorMessage("Please fill in the required information")
            return
        }
        const categoryData = {
            id: 0,
            name: category,
            color: currentTheme.colors.background,
            icon: '',
            userId: user.id
        }
        const cat : Category = new Category(categoryData)

        const currentDate = new Date()
        let newDay = currentDate.getDate()
        let newMonth = currentDate.getMonth() + 1
        let newYear = currentDate.getFullYear()

        if(newMonth + 1 == 13){
            newMonth = 1
            newYear = newYear + 1
        }
        const periodBudgetData = {
            id: 0,
            day: newDay,
            month: newMonth,
            year: newYear,
            userId: user.id
        }

        let firstBudgetDate : DateObj = new DateObj(periodBudgetData)

        const addCategoryStatus = await addNewCategory(cat)
        if(addCategoryStatus){
            ShowSuccessMessage(successCreateMessage)
        }else{
            ShowErrorMessage(genericFailureMessage)
        }
        await insertNewPeriodBudget(user.userId, Number.parseFloat(budget), cat, firstBudgetDate)
        Alert.alert('inserted x new budget along with the newly created category')
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
            <Title text={'Add category'}/>
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
            <View style={styles.textView}>
                <TextInput
                    style={styles.input}
                    label={'category name'}
                    textAlign={'center'}
                    value={category}
                    onChangeText={text => {
                        SetCategory(text)
                    }}
                />
            </View>
            <View style={styles.textView}>
                <TextInput
                    style={styles.input}
                    value={budget}
                    onChangeText={SetBudget}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    label='budget'
                    placeholderTextColor={currentTheme.colors.textColor}/>
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={addCategory}
                    style={styles.buttonView}>
                    <CustomButton text={'ADD'} color=""/>
                </TouchableOpacity>
                <View>
                    <Link href={"/(tabs)/expense/"}>
                        <CustomButton text={'BACK'} color=""/>
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default AddCategory
