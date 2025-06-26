import {useEffect, useState} from "react";
import {getCategories, getSelectedCategories} from "@/api/CategoryController";
import {Category} from "@/models/category";
import {preferenceStore} from "@/hooks/preferenceStore";

type UseCategoriesOptions = {
    userId: number;
    selectedOnly?: boolean;
};

export const useCategories = ({userId, selectedOnly = false}: UseCategoriesOptions) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cardsShown = preferenceStore.get('cards')?.numberValue

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId === undefined) {
                    return
                }
                if (selectedOnly) {
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
        }

        fetchData();
    }, [userId, selectedOnly])

    return {categories, loading, error, cardsShown};
};
