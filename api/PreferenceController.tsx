import {SAVE_PREFERENCES_URL, USER_PREFERENCES_BASE_URL} from '@/constants/apiConstants'
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";
import {UserPreference} from "@/models/userPreference";
import {Category} from "@/models/category";

export async function saveCategorySlots(userId: number, selectedSlots: (Category | null)[]) {
    const preferences = selectedSlots.map((category, index) => ({
        name: `Category ${index + 1}`,
        numberValue: category?.id ?? null
    }));

    const body = {
        userId,
        preferences
    };

    const request = formRequestWithBody(SAVE_PREFERENCES_URL, 'POST', body);
    const response = await fetch(request);

    if (!response.ok) {
        console.log('save preferences failed...')
    }

    return await response.json();
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
    const response = await fetch(`/api/userpreferences?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            numberValue: pref.numberValue,
            stringValue: pref.stringValue,
            dateValue: pref.dateValue,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update preference with ID ${id}`);
    }

    return await response.json();
}

// export async function updateAllPreferences(userId : number, preferences: UserPreference[]) {
//     const requests = preferences.map((pref) =>
//         fetch(`/api/userpreferences/${pref.id}`, {
//         method: "PUT",
//             headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             numberValue: pref.numberValue,
//             stringValue: pref.stringValue,
//             dateValue: pref.dateValue,
//         }),
//     })
//     );
//
//     // Option 1: Parallel updates
//     await Promise.all(requests);
// }

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
