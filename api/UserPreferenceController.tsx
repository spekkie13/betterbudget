import {USER_PREFERENCES_BASE_URL} from '@/constants/APIConstants'
import {formPreference, formRequestNoBody} from "@/api/ApiHelpers";
import {userPreference} from "@/models/userPreference";
import {Category} from "@/models/category";

export async function getUserPreferences(userId: number){
    const url = `${USER_PREFERENCES_BASE_URL}/${userId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    const response = await fetch(request)
    const data = await response.json()
    return data.map((item : any) => {
        return formPreference(item)
    })
}

export async function updatePreferences(userId : number, selectedCategories : Category[]) : Promise<void>{
    const existingPreferences : userPreference[] = await getUserPreferences(userId)
    let idx = 0;
    for(let i = 0; i < existingPreferences.length; i++){
        idx = i+1
        existingPreferences[i].name = 'category ' + idx
        existingPreferences[i].stringValue = selectedCategories[i].name
        existingPreferences[i].numberValue = selectedCategories[i].id

        const response = await fetch(`${USER_PREFERENCES_BASE_URL}/${existingPreferences[i].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingPreferences[i])
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    }
}

