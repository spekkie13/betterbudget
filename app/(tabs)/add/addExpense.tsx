import {View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import React from 'react'
import {useRouter} from "expo-router"
import {Title, Button, InputField, MessageBanner} from '@/app/components/General'
import {pickerSelectStyles, styles_AddExpense} from "@/styles/tabs/expense/styles_addExpense"
import {useThemeContext} from "@/theme/ThemeContext"
import {useAddTransaction} from "@/hooks/useAddTransaction";

const AddExpense = () => {
    const { message, date, setDate, amount, setAmount, description, setDescription, setSelectedValue, pickerItems, addNewExpense } = useAddTransaction()
    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = styles_AddExpense(currentTheme)

    return (
        <View style={styles.container}>
            <Title text={'Add Expense'}/>

            <MessageBanner message={message ?? ''} />
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
                        onPress={addNewExpense}
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
