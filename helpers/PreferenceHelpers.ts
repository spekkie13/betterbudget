import {UserPreference} from "@/types/models";

export function createDefaultPreferences(userId: number): UserPreference[] {
    return [
        {
            id: 0,
            name: 'ColorScheme',
            stringValue: 'light',
            userId,
        },
        {
            id: 0,
            name: 'Valuta',
            stringValue: '€',
            userId,
        },
        {
            id: 0,
            name: 'Cards',
            numberValue: 4,
            userId,
        },
        {
            id: 0,
            name: 'Starting Amount',
            numberValue: 0,
            userId,
        },
    ]
}
