import {useState} from "react";
import {getUserPreferenceByName} from "@/api/PreferenceController";
import {getCategories, getSelectedCategories} from "@/api/CategoryController";
import {Category} from "@/models/category";
import {useAsyncEffect} from "@/hooks/useAsyncEffect";

type UseCategoriesOptions = {
    userId: number;
    selectedOnly?: boolean;
};

export const useCategories = ({userId, selectedOnly = false}: UseCategoriesOptions) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cardsShown, setCardsShown] = useState<number>(0);

    useAsyncEffect(async () => {
        try {
            if (userId === undefined) {
                return
            }
            if (selectedOnly) {
                const cardsPref = await getUserPreferenceByName(userId, "Cards");
                setCardsShown(cardsPref?.numberValue ?? 6);

                const selected = await getSelectedCategories(userId);
                setCategories(selected);
            } else {
                const all = await getCategories(userId);
                setCategories(all);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    }, [userId, selectedOnly]);

    return {categories, loading, error, cardsShown};
};
