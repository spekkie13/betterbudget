import {View} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {useRouter} from "expo-router"
import {Title, Button, InputField, MessageBanner} from '@/app/components/General'
import {useThemeContext} from "@/theme/ThemeContext"
import {useAddTransaction} from "@/hooks/useAddTransaction";
import {styles_addIncome} from "@/styles/tabs/expense/styles_addIncome";

const AddIncome = () => {
    const {
        transactionState,
        updateField,
        addNewIncome
    } = useAddTransaction()

    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_addIncome(currentTheme), [currentTheme])

    const handleBack = useCallback(() => {
        router.replace('/(tabs)/add')
    }, [router])
    return (
        <View style={styles.container}>
            <Title text='Add Income'/>

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
                <View style={styles.buttonView}>
                    <Button text='Add'
                            onPress={addNewIncome}
                            style={styles.buttonView}/>

                    <Button text='Back'
                            onPress={handleBack}
                            style={styles.buttonView}/>
                </View>
            </View>
        </View>
    )
}

export default AddIncome
