import {useEffect, useState} from "react"
import {useThemeContext} from "@/theme/ThemeContext"
import {updateAllUserPreferences} from "@/api"
import {preferenceStore} from "@/hooks"

export function usePreferences() {
    const { setTheme } = useThemeContext()

    const [cards, setCards] = useState(0);
    const [valuta, setValuta] = useState('');
    const [themeSelection, setThemeSelection] = useState('');
    const [startingAmount, setStartingAmount] = useState(0);

    useEffect(() => {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        const startingAmountPref = preferenceStore.get('Starting Amount');
        if (cardsPref) setCards(cardsPref.numberValue ?? 4);
        if (valutaPref) setValuta(valutaPref.stringValue ?? '€');
        if (themePref) setThemeSelection(themePref.stringValue ?? 'light');
        if (startingAmountPref) setStartingAmount(startingAmountPref.numberValue ?? 0);
    }, []);

    async function updatePreferences() {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        const startingAmountPref = preferenceStore.get('Starting Amount');
        if (!cardsPref || !valutaPref || !themePref || !startingAmountPref) return;

        cardsPref.numberValue = cards;
        valutaPref.stringValue = valuta;
        themePref.stringValue = themeSelection;
        startingAmountPref.numberValue = startingAmount;

        preferenceStore.set(cardsPref);
        preferenceStore.set(valutaPref);
        preferenceStore.set(themePref);
        preferenceStore.set(startingAmountPref);

        if (themeSelection === 'light' || themeSelection === 'dark') {
            setTheme(themeSelection);
        }

        await updateAllUserPreferences(preferenceStore.getAll());
    }

    return {
        cards, setCards,
        valuta, setValuta,
        themeSelection, setThemeSelection,
        startingAmount, setStartingAmount,
        updatePreferences,
    };
}
