import {Text, TouchableOpacity, useColorScheme, View} from 'react-native';
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
import {getUserPreferences, updateUserPreference} from '@/api/PreferenceController';
import {supabase} from "@/lib/supabase";
import {useAsyncEffect} from "@/hooks/useAsyncEffect";

const Settings = () => {
    const {user, logout} = useContext(AuthContext);

    const [preferences, setPreferences] = useState<any[]>([]);
    const [cardsShown, setCardsShown] = useState<number>(0);
    const [valuta, setValuta] = useState<string>('€');

    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_settings(currentTheme);

    useAsyncEffect(async () => {
        try {
            const prefs = await getUserPreferences(user.id);
            setPreferences(prefs);

            const cardsPref = prefs.find((p: any) => p.name === 'Cards');
            const valutaPref = prefs.find((p: any) => p.name === 'Valuta');

            if (cardsPref) setCardsShown(cardsPref.numberValue);
            if (valutaPref) setValuta(valutaPref.stringValue);
        } catch (error) {
            console.error('Failed to fetch preferences:', error);
        }
    }, [user?.id])

    const updatePreferences = async () => {
        for (const pref of preferences) {
            const updated = {...pref};

            if (pref.name === 'Cards') {
                updated.numberValue = cardsShown;
            }

            if (pref.name === 'Valuta') {
                updated.stringValue = valuta;
            }

            await updateUserPreference(pref.id, updated);
        }
    };

    const SignOut = async () => {
        await supabase.auth.signOut();
        await logout();
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
                    onValueChange={(value) => setCardsShown(parseInt(value))}
                    value={cardsShown.toString()}
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

            <TouchableOpacity onPress={updatePreferences} style={styles.updateButton}>
                <CustomButton text={'Update Preferences'} color={''}/>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
