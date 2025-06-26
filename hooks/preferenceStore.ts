import {UserPreference} from "@/models/userPreference";

export class PreferenceStore {
    private preferences: UserPreference[] = [];

    load(preferences: UserPreference[]) {
        this.preferences = preferences;
    }

    get(key: string): UserPreference {
        return this.preferences.find((p) => p.name.toLowerCase() === key.toLowerCase());
    }

    set(value: UserPreference) {
        this.preferences.push(value);
    }

    getAll(): UserPreference[] {
        return this.preferences;
    }

    clear() {
        this.preferences = [];
    }
}

export const preferenceStore = new PreferenceStore();
