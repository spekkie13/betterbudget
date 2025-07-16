import {USER_PREFERENCES_BASE_URL} from '@/constants'
import {formRequestNoBody, formRequestWithBody, createDefaultPreferences} from "@/helpers"
import {Category, UserPreference} from "@/types/models"
import {preferenceStore} from "@/hooks"

export async function setupNewUserPrefs(userId: number): Promise<void> {
    const preferences : UserPreference[] = createDefaultPreferences(userId)

    await Promise.all(
        preferences.map(async (pref) => {
            const request : Request = formRequestWithBody(USER_PREFERENCES_BASE_URL, 'POST', pref)
            const response : Response = await fetch(request)

            if (!response.ok) {
                console.error(`Failed to save preference ${pref.name}`, await response.text())
                throw new Error(`Failed to save preference ${pref.name}`)
            }
        })
    )
}

export async function saveCategorySlots(selectedSlots: (Category | null)[]) {
    const allPrefs = preferenceStore.getAll()

    await Promise.all(
        selectedSlots.map(async (category, index) => {
            const name = `Category ${index + 1}`
            const existingPref = allPrefs.find(p => p.name === name)

            if (!existingPref) {
                console.warn(`Preference with name ${name} not found`)
                return
            }

            await updateUserPreference(existingPref.id, {
                id: existingPref.id,
                name: name ?? "",
                userId: existingPref.userId ?? 0,
                numberValue: category?.id ?? null,
            })

            const newPref = {
                ...existingPref,
                name: name ?? "",
                userId: existingPref.userId ?? 0,
                numberValue: category?.id ?? null,
            }
            preferenceStore.set(newPref)
            console.log(preferenceStore.nameContains('category'))
        })
    )
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
        name: pref.name,
        numberValue: pref.numberValue ?? null,
        stringValue: pref.stringValue ?? null,
        dateValue: pref.dateValue ?? null,
        userId: pref.userId ?? 0,
    }

    const request = formRequestWithBody(USER_PREFERENCES_BASE_URL, 'PUT', body)
    const response = await fetch(request)

    if (!response.ok) {
        const errorText = await response.text()
        console.error('Update failed:', errorText)
        throw new Error(`Failed to update preference with ID ${id}`)
    }

    return await response.json()
}

export async function updateAllUserPreferences(preferences: UserPreference[]){
    await Promise.all(preferences.map(async (preference) => {
        await updateUserPreference(preference.id, preference)
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
