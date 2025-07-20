import {useCallback, useEffect, useState} from "react"
import {useThemeContext} from "@/theme/ThemeContext"
import {updateAllUserPreferences} from "@/api"
import {preferenceStore} from "@/hooks"

export function usePreferences() {
    const { setTheme } = useThemeContext()

    const [preferenceState, setPreferenceState] = useState({
        cards: '',
        valuta: '',
        themeSelection: '',
        startingAmount: 0,
        message: '',
        status: true
    })

    const handleUpdateField = useCallback((fieldName: string) => (value: string) => {
        setPreferenceState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }, [])

    useEffect(() => {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        const startingAmountPref = preferenceStore.get('Starting Amount');
        if (cardsPref) setPreferenceState(prev => ({
            ...prev,
            cards: cardsPref.numberValue.toString() ?? '0',
        }))
        if (valutaPref) setPreferenceState(prev => ({
            ...prev,
            valuta: valutaPref.stringValue ?? '€',
        }))
        if (themePref) setPreferenceState(prev => ({
            ...prev,
            themeSelection: themePref.stringValue ?? 'light',
        }))
        if (startingAmountPref) setPreferenceState(prev => ({
            ...prev,
            startingAmount: startingAmountPref.numberValue ?? 0
        }))
    }, []);

    function showMessage(msg: string) {
        setPreferenceState(prev => ({
            ...prev,
            message: msg,
        }))
        setTimeout(() => setPreferenceState(prev => ({
            ...prev,
            message: null,
        })), 3000);
    }

    async function updatePreferences() {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        const startingAmountPref = preferenceStore.get('Starting Amount');

        cardsPref.numberValue = Number(preferenceState.cards);
        valutaPref.stringValue = preferenceState.valuta;
        themePref.stringValue = preferenceState.themeSelection;
        startingAmountPref.numberValue = preferenceState.startingAmount;

        preferenceStore.set(cardsPref);
        preferenceStore.set(valutaPref);
        preferenceStore.set(themePref);
        preferenceStore.set(startingAmountPref);

        if (preferenceState.themeSelection === 'light' || preferenceState.themeSelection === 'dark') {
            setTheme(preferenceState.themeSelection);
        }

        await updateAllUserPreferences(preferenceStore.getAll());
        setPreferenceState(prevState => ({
            ...prevState,
            status: true,
        }))
        showMessage('Preferences updated');
    }

    return {
        preferenceState,
        handleUpdateField,
        updatePreferences,
    };
}
