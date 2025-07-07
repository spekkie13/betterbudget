import {USER_PREFERENCES_BASE_URL} from '@/constants/apiConstants'
import {formRequestNoBody} from "@/api/ApiHelpers";
import {UserPreference} from "@/models/userPreference";
import {Category} from "@/models/category";
import {preferenceStore} from "@/hooks/preferenceStore";

export async function saveCategorySlots(selectedSlots: (Category | null)[]) {
    const allPrefs = preferenceStore.getAll();

    await Promise.all(
        selectedSlots.map(async (category, index) => {
            const name = `Category ${index + 1}`;
            const existingPref = allPrefs.find(p => p.name === name);

            if (!existingPref) {
                console.warn(`Preference with name ${name} not found`);
                return;
            }

            await updateUserPreference(existingPref.id, {
                id: existingPref.id,
                numberValue: category?.id ?? null,
            });
        })
    );
}

export async function getUserPreferences(userId: number) {
    const url = `${USER_PREFERENCES_BASE_URL}?userId=${userId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    const response : Response = await fetch(request)
    const data : any = await response.json()

    let preferences: UserPreference[] = []
    for (const item of data) {
        const preference = formPreference(item)
        preferences.push(preference)
    }

    return preferences
}

export async function updateUserPreference(id: number, pref: Partial<UserPreference>) {
    const body = {
        id,
        numberValue: pref.numberValue ?? null,
        stringValue: pref.stringValue ?? null,
        dateValue: pref.dateValue ?? null,
    };

    const response = await fetch(`${USER_PREFERENCES_BASE_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Update failed:', errorText);
        throw new Error(`Failed to update preference with ID ${id}`);
    }

    return await response.json();
}

export async function updateAllUserPreferences(preferences: UserPreference[]){
    await Promise.all(preferences.map(async (preference) => {
        await updateUserPreference(preference.id, preference);
    }))
}

export function formPreference(item: any): UserPreference {
    const preferenceData = {
        id: item.id,
        userId: item.userId,
        name: item.name,
        stringValue: item.stringValue,
        numberValue: item.numberValue,
        dateValue: item.dateValue
    }
    return new UserPreference(preferenceData)
}
