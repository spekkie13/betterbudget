import {Text, TouchableOpacity, View} from 'react-native';
import Logo from '@/app/general/Logo';
import React, {useContext, useState} from 'react';
import Title from '@/app/general/Title';
import SubTitle from '@/app/general/SubTitle';
import {AuthContext} from '@/app/ctx';
import {pickerStyles, styles_settings} from '@/styles/tabs/settings/styles_settings';
import CustomDarkTheme from '@/theme/CustomDarkTheme';
import CustomDefaultTheme from '@/theme/CustomDefaultTheme';
import {router} from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '@/app/general/CustomButton';
import {supabase} from "@/lib/supabase";
import {preferenceStore} from "@/hooks/preferenceStore";
import {updateAllUserPreferences} from "@/api/PreferenceController";

const Settings = () => {
    const {user, logout} = useContext(AuthContext);

    const cardsPreference = preferenceStore.get('cards')
    const [cards, setCards] = useState(cardsPreference.numberValue)
    const [valuta, setValuta] = useState(preferenceStore.get('valuta').stringValue)
    const [theme, setTheme] = useState<string>('');

    const colorScheme = preferenceStore.get('colorScheme').stringValue;
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_settings(currentTheme);

    const updatePreferences = async () => {
        cardsPreference.numberValue = cards
        preferenceStore.set(cardsPreference)
        console.log(preferenceStore.get('cards'))

    };

    const SignOut = async () => {
        await supabase.auth.signOut();
        await logout();
        await updateAllUserPreferences(user.id,  preferenceStore.getAll());
        preferenceStore.clear()
        router.replace('/sign-in');
    };

    return (
        <View style={styles.container}>
            <Title text={'Settings'}/>
            <Logo/>
            <TouchableOpacity onPress={SignOut} style={styles.logoutView}>
                <CustomButton text={'Sign Out'} color={'#ff0000'}/>
            </TouchableOpacity>
            <SubTitle text={'Settings Page'}/>

            <View style={styles.view}>
                <Text style={styles.text}>Categories Shown</Text>
                <RNPickerSelect
                    onValueChange={(value) => setCards(parseInt(value))}
                    value={cards.toString()}
                    items={['2', '4', '6', '8', '10'].map((val) => ({key: val, label: val, value: val}))}
                    placeholder={{label: 'How many cards?', value: ''}}
                    style={pickerStyles(currentTheme)}
                />
            </View>

            <View style={styles.view}>
                <Text style={styles.text}>Valuta</Text>
                <RNPickerSelect
                    onValueChange={(value) => setValuta(value)}
                    value={valuta}
                    items={[{key: '1', label: '€', value: '€'}, {key: '2', label: '$', value: '$'}]}
                    placeholder={{label: 'Valuta symbol', value: ''}}
                    style={pickerStyles(currentTheme)}
                />
            </View>

            <View style={styles.view}>
                <Text style={styles.text}>Theme</Text>
                <RNPickerSelect
                    onValueChange={(value) => setTheme(value)}
                    value={theme}
                    items={[{key: '1', label: 'dark', value: 'dark'}, {key: '2', label: 'light', value: 'light'}]}
                    placeholder={{label: 'current theme', value: ''}}
                    style={pickerStyles(currentTheme)}
                />
            </View>

            <TouchableOpacity onPress={updatePreferences} style={styles.updateButton}>
                <CustomButton text={'Update Preferences'} color={''}/>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
