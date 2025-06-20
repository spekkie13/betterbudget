import {Category} from "@/models/category";
import {CATEGORY_BASE_URL, CATEGORY_EXISTS_URL} from "@/constants/APIConstants";
import {formRequestNoBody,} from "@/api/ApiHelpers";
import {getUserPreferenceByName, getUserPreferences,} from "@/api/PreferenceController";

/*
get all categories for a specific user
returns a collection of categories or an empty category when no categories are found

UserId -> user to fetch categories for
*/
export async function getCategories(userId: number): Promise<Category[]> {
    const url = `${CATEGORY_BASE_URL}?userId=${userId}`;
    const request: RequestInfo = formRequestNoBody(url, "get");

    const response = await fetch(request);

    if (!response.ok) {
        console.log(`Failed to fetch category: ${response.statusText}`);
        return [Category.empty()]
    }

    const data = await response.json();

    return data.map((item: any) => {
        return new Category({
            id: item.id,
            name: item.name,
            color: item.color,
            icon: item.icon,
            userId: item.userId,
        });
    });
}

/*
fetch all selected categories for a specific user (based on their preferences)
returns a collection of categories or an empty category when no categories are found

UserId -> user to fetch categories for
*/
export async function getSelectedCategories(userId: number): Promise<Category[]> {
    const cardsPref = await getUserPreferenceByName(userId, "cards");
    const cards = cardsPref.numberValue;

    let userPreferences = await getUserPreferences(userId);
    userPreferences = userPreferences
        .filter((item) => item.name.toLowerCase().includes("category"))
        .slice(0, cards);

    // 🔄 Fetch all categories concurrently
    const fetchPromises = userPreferences.map((pref) =>
        getCategoryById(userId, pref.numberValue)
    );

    return await Promise.all(fetchPromises);
}

/*
Fetch a single category by ID for a specific user
returns a single category object or an empty category object when no category is found

User ID -> user to fetch categories for
id -> Category to be fetched
*/
export async function getCategoryById(userId: number, id: number): Promise<Category> {
    const url: string = `${CATEGORY_BASE_URL}?userId=${userId}&id=${encodeURIComponent(id)}`;
    const request: RequestInfo = formRequestNoBody(url, "GET");
    const response = await fetch(request);

    if (!response.ok) {
        console.log(`Failed to fetch category: ${response.statusText}`);
        return Category.empty();
    }

    const data = await response.json();

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

/*
Check if a category with the provided name exists for the specified user
returns a boolean based on whether a category with the provided name exists

name -> name to check
User ID -> user to check the name for
*/
export async function checkIfCategoryExists (name: string, userId: number): Promise<boolean> {
    const response = await fetch(CATEGORY_EXISTS_URL + `?userId=${userId}&name=${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userId }),
    });

    const result = await response.json();
    return result.exists === true;
}
