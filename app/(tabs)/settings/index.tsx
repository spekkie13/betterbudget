import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import Logo from '@/app/general/Logo'
import React, {useContext, useState} from 'react'
import Title from '@/app/general/Title'
import SubTitle from '@/app/general/SubTitle'
import Preferences from "@/models/preferences"
import {AuthContext} from "@/app/ctx"
import auth from "@react-native-firebase/auth"
import {pickerStyles, styles_settings} from "@/styles/styles_settings"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import {router} from 'expo-router'
import RNPickerSelect from "react-native-picker-select";
import CustomButton from "@/app/general/CustomButton";

const Settings = () => {
    const {logout} = useContext(AuthContext)

    const Cards : string = Preferences.get('Cards on Home Page')
    const [cardsShown, SetCardsShown] = useState(Cards)
    const [valuta, setValuta] = useState('€')

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_settings(currentTheme)

    const updatePreferences = () : void => {
        Preferences.set('Cards on Home Page', cardsShown ?? '0')
        Preferences.set('Valuta', valuta)
    }

    const SignOut = async () => {
        await auth().signOut()
        logout()
        router.replace('/sign-in')
    }

    return (
        <View style={styles.container}>
            <Title text={'Settings'} />
            <Logo />
            <TouchableOpacity
                onPress={SignOut}
                style={styles.logoutView}>
                <CustomButton text={'Sign Out'} color={'#ff0000'} />
            </TouchableOpacity>
            <SubTitle text={'Settings Page'} />
            <View style={styles.view}>
                <Text style={styles.text}>Categories Shown</Text>
                <RNPickerSelect
                    onValueChange={(value) => SetCardsShown(value)}
                    value={cardsShown}
                    items={[
                        { key: '2', label: '2', value: '2'},
                        { key: '4', label: '4', value: '4'},
                        { key: '6', label: '6', value: '6'},
                        { key: '8', label: '8', value: '8'},
                        { key: '10', label: '10', value: '10'}
                    ]}
                    placeholder={{label: 'How many cards?', value: null}}
                    style={pickerStyles(currentTheme)}/>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Valuta</Text>
                <RNPickerSelect
                    onValueChange={(value) => setValuta(value)}
                    value={valuta}
                    items={[
                        { key: '1', label: '€', value: '€'},
                        { key: '2', label: '$', value: '$'},
                    ]}
                    placeholder={{label: 'Valuta symbol', value: null}}
                    style={pickerStyles(currentTheme)}/>
            </View>
            <TouchableOpacity
                onPress={updatePreferences}
                style={styles.updateButton}>
                    <CustomButton text={'Update Preferences'} color={''} />
            </TouchableOpacity>
        </View>
    )
}

export default Settings
