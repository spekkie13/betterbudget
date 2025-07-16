import {UserPreference} from "@/types/models"

export class PreferenceStore {
    private preferences: UserPreference[] = []

    load(preferences: UserPreference[]) {
        this.preferences = preferences
    }

    get(key: string): UserPreference {
        return this.preferences.find((p) => p.name.toLowerCase() === key.toLowerCase())
    }

    nameContains(key: string): UserPreference[] {
        return this.preferences.filter((p) => p.name.toLowerCase().includes(key.toLowerCase()))
    }

    set(value: UserPreference) {
        const index = this.preferences.findIndex(p => p.id === value.id)

        if (index !== -1) {
            this.preferences[index] = value // update bestaande preference
        } else {
            this.preferences.push(value) // voeg nieuwe toe
        }
    }

    getAll(): UserPreference[] {
        return this.preferences
    }

    clear() {
        this.preferences = []
    }
}

export const preferenceStore = new PreferenceStore()
