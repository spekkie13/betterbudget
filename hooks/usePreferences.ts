import {useCallback, useEffect, useState} from "react"
import {useThemeContext} from "@/theme/ThemeContext"
import {updateAllUserPreferences} from "@/api"
import {preferenceStore} from "@/hooks"

export function usePreferences() {
    const { setTheme } = useThemeContext()

    const [preferenceState, setPreferenceState] = useState({
        cards: 0,
        valuta: '',
        themeSelection: '',
        startingAmount: 0,
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
            cards: cardsPref.numberValue ?? 0,
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

    async function updatePreferences() {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        const startingAmountPref = preferenceStore.get('Starting Amount');
        if (!cardsPref || !valutaPref || !themePref || !startingAmountPref) return;

        cardsPref.numberValue = preferenceState.cards;
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
    }

    return {
        preferenceState,
        handleUpdateField,
        updatePreferences,
    };
}
