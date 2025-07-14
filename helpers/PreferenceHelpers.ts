import {IUserPreference} from "@/models/preference";

export function createDefaultPreferences(userId: number): IUserPreference[] {
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
        }
    ]
}
