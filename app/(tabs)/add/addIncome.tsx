import {View} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router"
import {Title, Button, InputField, MessageBanner} from '@/app/components/General'
import {useThemeContext} from "@/theme/ThemeContext"
import {useAddTransaction} from "@/hooks/useAddTransaction";
import {styles_addIncome} from "@/styles/tabs/expense/styles_addIncome";

const AddIncome = () => {
    const {
        message,
        date, setDate,
        amount, setAmount,
        addNewIncome
    } = useAddTransaction()

    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = styles_addIncome(currentTheme)

    return (
        <View style={styles.container}>
            <Title text='Add Income'/>

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
                <View style={styles.buttonView}>
                    <Button text='Add'
                            onPress={addNewIncome}
                            style={styles.buttonView}/>

                    <Button text='Back'
                            onPress={() => router.replace('/(tabs)/add')}
                            style={styles.buttonView}/>
                </View>
            </View>
        </View>
    )
}

export default AddIncome
