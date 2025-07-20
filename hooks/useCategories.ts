import {useContext, useEffect, useState} from "react"
import {getCategories, getSelectedCategories} from "@/api"
import {Category} from "@/types/models"
import {CategoriesProps} from "@/types/props"
import {preferenceStore} from "@/hooks/preferenceStore";
import {AuthContext} from "@/app/ctx";

export const useCategories = ({selectedOnly = false, refreshTrigger = 0 }: CategoriesProps) => {
    const { userState } = useContext(AuthContext)
    const userId = userState.user?.id

    const [categoriesState, setCategoriesState] = useState({
        categories: [] as Category[] | null,
        loading: false,
        error: null as string | null,
        cardsShown: 0,
        categoryPreferences: false
    })

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const preferredCardCount = preferenceStore.get('cards')?.numberValue ?? 0
                const prefs = preferenceStore.nameContains('category').length > 0

                if (!userId) return;

                let categories: Category[];
                let effectiveCardCount: number;

                if (selectedOnly && prefs) {
                    categories = await getSelectedCategories(userId, preferredCardCount);
                    effectiveCardCount = Math.min(preferredCardCount, categories.length);
                } else {
                    categories = await getCategories(userId);
                    effectiveCardCount = Math.min(preferredCardCount, categories.length);
                }

                if (!mounted) return;

                // Single state update with all changes
                setCategoriesState({
                    loading: false,
                    error: null,
                    categories,
                    cardsShown: effectiveCardCount,
                    categoryPreferences: prefs,
                });

            } catch (err) {
                console.error(err);
                if (!mounted) return;

                setCategoriesState(prev => ({
                    ...prev,
                    loading: false,
                    error: "Failed to load categories"
                }));
            }
        };

        setCategoriesState(prev => ({
            ...prev,
            loading: true
        }));

        fetchData();

        return () => {
            mounted = false;
        };
    }, [userId, selectedOnly, refreshTrigger]);

    return {categoriesState};
}
