import {Category} from "@/models/category";
import {CATEGORY_BASE_URL, CATEGORY_EXISTS_URL} from "@/constants/apiConstants";
import {formRequestNoBody,} from "@/api/ApiHelpers";
import {getUserPreferenceByName, getUserPreferences,} from "@/api/PreferenceController";
import {UserPreference} from "@/models/userPreference";

export async function getCategories(userId: number): Promise<Category[]> {
    const url = `${CATEGORY_BASE_URL}?userId=${userId}`;
    const request: RequestInfo = formRequestNoBody(url, "get");

    const response : Response = await fetch(request);

    if (!response.ok) {
        console.log(`Failed to fetch category: ${response.statusText}`);
        return [Category.empty()]
    }

    const data : any = await response.json();

    return data.map((item: any) : Category => {
        return new Category({
            id: item.id,
            name: item.name,
            color: item.color,
            icon: item.icon,
            userId: item.userId,
        });
    });
}

export async function getSelectedCategories(userId: number): Promise<Category[]> {
    const cardsPref : UserPreference = await getUserPreferenceByName(userId, "cards");
    const cards : number = cardsPref.numberValue;

    let userPreferences : UserPreference[] = await getUserPreferences(userId);
    userPreferences = userPreferences
        .filter((item : UserPreference) : boolean => item.name.toLowerCase().includes("category"))
        .slice(0, cards);

    // 🔄 Fetch all categories concurrently
    const fetchPromises : Promise<Category>[] = userPreferences.map((pref : UserPreference) : Promise<Category> =>
        getCategoryById(userId, pref.numberValue)
    );

    return await Promise.all(fetchPromises);
}

export async function getCategoryById(userId: number, id: number): Promise<Category> {
    const url: string = `${CATEGORY_BASE_URL}?userId=${userId}&id=${encodeURIComponent(id)}`;
    const request: RequestInfo = formRequestNoBody(url, "GET");
    const response : Response = await fetch(request);

    if (!response.ok) {
        console.log(`Failed to fetch category: ${response.statusText}`);
        return Category.empty();
    }

    const data : any = await response.json();

    const categoryData = {
        id: data.id,
        name: data.name,
        color: data.color,
        icon: data.icon,
        userId: data.userId,
    };
    return new Category(categoryData);
}

export async function deleteCategoryById(id: number): Promise<any> {
    console.log(id)
    return false;
}

export async function checkIfCategoryExists(name: string, userId: number): Promise<boolean> {
    const response : Response = await fetch(CATEGORY_EXISTS_URL + `?userId=${userId}&name=${name}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, userId}),
    });

    const result : any = await response.json();
    return result.exists === true;
}
