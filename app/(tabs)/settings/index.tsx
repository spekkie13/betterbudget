import { Text, TouchableOpacity, View } from 'react-native';
import Logo from '@/app/components/UI/Logo';
import React, { useContext, useMemo, useState } from 'react';
import Title from '@/app/components/Text/Title';
import { AuthContext } from '@/app/ctx';
import { pickerStyles, styles_settings } from '@/styles/tabs/settings/styles_settings';
import { router } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import CustomButton from '@/app/components/UI/CustomButton';
import { supabase } from "@/lib/supabase";
import { preferenceStore } from "@/hooks/preferenceStore";
import { updateAllUserPreferences } from "@/api/PreferenceController";
import { useThemeContext } from '@/theme/ThemeContext'; // ✅ import context

const Settings = () => {
    const { logout } = useContext(AuthContext);
    const { setTheme, currentTheme } = useThemeContext();

    const [refreshKey, setRefreshKey] = useState(0);
    const cardsPreference = preferenceStore.get('cards');
    const valutaPreference = preferenceStore.get('valuta');
    const themePreference = preferenceStore.get('colorScheme');

    const [cards, setCards] = useState(cardsPreference.numberValue);
    const [valuta, setValuta] = useState(valutaPreference.stringValue);
    const [themeSelection, setThemeSelection] = useState(themePreference.stringValue); // ⏳ tijdelijke selectie

    const styles = useMemo(() => styles_settings(currentTheme), [currentTheme]);

    const updatePreferences = async () => {
        cardsPreference.numberValue = cards;
        valutaPreference.stringValue = valuta;
        themePreference.stringValue = themeSelection;

        preferenceStore.set(cardsPreference);
        preferenceStore.set(valutaPreference);
        preferenceStore.set(themePreference);

        if(themeSelection === 'light' || themeSelection === 'dark') {
            setTheme(themeSelection); // ✅ update context-theme
        }
        setRefreshKey(prev => prev + 1);
    };

    const SignOut = async () => {
        await supabase.auth.signOut();
        await logout();
        await updateAllUserPreferences(preferenceStore.getAll());
        preferenceStore.clear();
        router.replace('/sign-in');
    };

    return (
        <View key={refreshKey} style={styles.container}>
            <Title text={'Settings'} />
            <Logo />
            <TouchableOpacity onPress={SignOut} style={styles.logoutView}>
                <CustomButton text='Sign Out' color='#ff0000' textColor="#ffffff" />
            </TouchableOpacity>

            <View>
                <View style={styles.view}>
                    <Text style={styles.text}>Categories Shown</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setCards(parseInt(value))}
                        value={cards.toString()}
                        items={['2', '4', '6', '8', '10'].map((val) => ({ key: val, label: val, value: val }))}
                        placeholder={{ label: 'How many cards?', value: '' }}
                        style={pickerStyles(currentTheme)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Valuta</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setValuta(value)}
                        value={valuta}
                        items={[{ key: '1', label: '€', value: '€' }, { key: '2', label: '$', value: '$' }]}
                        placeholder={{ label: 'Valuta symbol', value: '' }}
                        style={pickerStyles(currentTheme)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Theme</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setThemeSelection(value)}
                        value={themeSelection}
                        items={[{ key: '1', label: 'dark', value: 'dark' }, { key: '2', label: 'light', value: 'light' }]}
                        style={pickerStyles(currentTheme)}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={updatePreferences} style={styles.updateButton}>
                <CustomButton text='Update Preferences' color='' textColor='#ffffff' />
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
