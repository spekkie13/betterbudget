import { Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { router } from 'expo-router'
import RNPickerSelect from 'react-native-picker-select'
import { Logo, Title, Button } from '@/app/components/General'
import { AuthContext } from '@/app/ctx'
import { pickerStyles, styles_settings } from '@/styles/tabs/settings/styles_settings'
import { supabase } from "@/lib/supabase"
import { preferenceStore, usePreferences } from "@/hooks"
import { updateAllUserPreferences } from "@/api"
import { useThemeContext } from '@/theme/ThemeContext'

const Settings = () => {
    const {
        cards, setCards,
        valuta, setValuta,
        themeSelection, setThemeSelection,
        updatePreferences,
    } = usePreferences();

    const { logout } = useContext(AuthContext)
    const { currentTheme } = useThemeContext()

    const styles = useMemo(() => styles_settings(currentTheme), [currentTheme])
    const SignOut = async () => {
        await supabase.auth.signOut()
        await logout()
        await updateAllUserPreferences(preferenceStore.getAll())
        preferenceStore.clear()
        router.replace('/sign-in')
    }

    return (
        <View style={styles.container}>
            <Title text={'Settings'} />
            <Logo />

            <Button text='Sign Out'
                onPress={SignOut}
                color={'red'}
                style={styles.signOutButton}/>

            <View>
                <View style={styles.view}>
                    <Text style={styles.text}>Categories Shown</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setCards(parseInt(value))}
                        value={cards != null ? String(cards) : ''}
                        items={['2', '4', '6', '8', '10'].map((val) => ({ key: val, label: val, value: val }))}
                        placeholder={{ label: 'How many cards?', value: '' }}
                        style={pickerStyles(currentTheme)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Valuta</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setValuta(value)}
                        value={valuta != null ? valuta : ''}
                        items={[{ key: '1', label: '€', value: '€' }, { key: '2', label: '$', value: '$' }]}
                        placeholder={{ label: 'Valuta symbol', value: '' }}
                        style={pickerStyles(currentTheme)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Theme</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setThemeSelection(value)}
                        value={themeSelection != null ? themeSelection : ''}
                        items={[{ key: '1', label: 'dark', value: 'dark' }, { key: '2', label: 'light', value: 'light' }]}
                        style={pickerStyles(currentTheme)}
                    />
                </View>
            </View>

            <Button
                text='Update Preferences'
                onPress={updatePreferences}
                style={styles.button}/>
        </View>
    )
}

export default Settings
