import {Category} from "@/models/category"
import {CATEGORY_BASE_URL} from "@/constants/APIConstants"
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers"
import { getUserPreferences } from "@/api/UserPreferenceController";

export async function fetchCategories(userId: number): Promise<Category[]> {
    const url = `${CATEGORY_BASE_URL}/${userId}`;
    const request: RequestInfo = formRequestNoBody(url, 'get');

    return fetch(request)
        .then(res => res.json())
        .then(data => {
            const categories: Category[] = data
                .map(item => new Category(item))
                .filter(category => category.name && category.name.trim() !== "");
            return categories;
        });
}

export async function fetchSelectedCategories(userId: number) : Promise<Category[]> {
    let userPreferences = await getUserPreferences(userId)
    userPreferences = userPreferences.filter((preference) => preference.name.toLowerCase().includes("category"))

    let categories = []
    for(let i = 0; i < userPreferences.length; i++){
        categories.push(await fetchCategoryById(userId, userPreferences[i].numberValue))
    }
    return categories;
}

export async function addNewCategory(category: Category) : Promise<boolean> {
    const request : RequestInfo = formRequestWithBody(CATEGORY_BASE_URL, 'POST', category)
    const response = await fetch(request)
    return await response.json()
}

export async function updateCategory(category: Category) : Promise<any> {
    //TODO: replace with method to just update Name, Color or Icon
    const request : RequestInfo = formRequestWithBody(CATEGORY_BASE_URL, 'PATCH', category)
    await fetch(request)
}

export async function fetchCategoryById(userId: number, id: number) : Promise<Category>{
    const headers: Headers = new Headers()
    headers.set("Accept", "plain/text")
    headers.set("Content-Type", "application/json")

    const url : string = `${CATEGORY_BASE_URL}/${userId}/${encodeURIComponent(id)}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')
    const response = await fetch(request)
    const data = await response.json()
    return data as Category
}

export async function deleteCategoryById(id: number) : Promise<any> {
    return false
}
