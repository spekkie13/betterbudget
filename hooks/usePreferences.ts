import {useEffect, useState} from "react"
import {useThemeContext} from "@/theme/ThemeContext"
import {updateAllUserPreferences} from "@/api"
import {preferenceStore} from "@/hooks"

export function usePreferences() {
    const { setTheme } = useThemeContext()

    const [cards, setCards] = useState(0);
    const [valuta, setValuta] = useState('');
    const [themeSelection, setThemeSelection] = useState('');

    useEffect(() => {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        if (cardsPref) setCards(cardsPref.numberValue ?? 4);
        if (valutaPref) setValuta(valutaPref.stringValue ?? '€');
        if (themePref) setThemeSelection(themePref.stringValue ?? 'light');
    }, []);

    async function updatePreferences() {
        const cardsPref = preferenceStore.get('cards');
        const valutaPref = preferenceStore.get('valuta');
        const themePref = preferenceStore.get('colorScheme');
        if (!cardsPref || !valutaPref || !themePref) return;

        cardsPref.numberValue = cards;
        valutaPref.stringValue = valuta;
        themePref.stringValue = themeSelection;

        preferenceStore.set(cardsPref);
        preferenceStore.set(valutaPref);
        preferenceStore.set(themePref);

        if (themeSelection === 'light' || themeSelection === 'dark') {
            setTheme(themeSelection);
        }

        await updateAllUserPreferences(preferenceStore.getAll());
    }

    return {
        cards,
        setCards,
        valuta,
        setValuta,
        themeSelection,
        setThemeSelection,
        updatePreferences,
    };
}
