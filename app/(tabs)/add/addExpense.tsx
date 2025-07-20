import {View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import React, {useCallback, useMemo} from 'react'
import {useRouter} from "expo-router"
import {Title, Button, InputField, MessageBanner} from '@/app/components/General'
import {pickerSelectStyles, styles_AddExpense} from "@/styles/tabs/expense/styles_addExpense"
import {useThemeContext} from "@/theme/ThemeContext"
import {useAddTransaction} from "@/hooks/useAddTransaction";

const AddExpense = () => {
    const { transactionState, updateField, addNewExpense } = useAddTransaction()
    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_AddExpense(currentTheme), [currentTheme])

    const handleBack = useCallback(() => {
        router.replace('/(tabs)/add')
    }, [router])

    return (
        <View style={styles.container}>
            <Title text={'Add Expense'}/>

            <MessageBanner message={transactionState.message ?? ''} type={transactionState.status ? 'success' : 'error'}/>
            <View style={styles.addView}>
                <View style={styles.view}>
                    <InputField
                        label={'Date'}
                        placeholder={'dd-MM-yyyy'}
                        onChange={updateField('date')}
                        value={transactionState.date}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <InputField
                        label={'amount'}
                        onChange={updateField('amount')}
                        value={transactionState.amount}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <InputField
                        label={'description'}
                        onChange={updateField('description')}
                        value={transactionState.description}
                        secure={false}/>
                </View>
                <View style={styles.view}>
                    <RNPickerSelect
                        onValueChange={updateField('selectedValue')}
                        items={transactionState.pickerItems}
                        placeholder={{label: 'Select a category...', value: ''}}
                        style={pickerSelectStyles(currentTheme)}/>
                </View>
                <View style={styles.buttonView}>
                    <Button text='Add'
                        onPress={addNewExpense}
                        style={styles.buttonView}/>

                    <Button text='Back'
                        onPress={handleBack}
                        style={styles.buttonView}/>
                </View>
            </View>
        </View>
    )
}

export default AddExpense
