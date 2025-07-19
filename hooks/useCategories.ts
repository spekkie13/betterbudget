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
                const val = preferenceStore.get('cards')?.numberValue
                const prefs = preferenceStore.nameContains('category').length > 0

                if (!userId) return;

                let categories: Category[];
                if (selectedOnly && prefs) {
                    categories = await getSelectedCategories(userId, val || 0);
                } else {
                    categories = await getCategories(userId);
                }

                if (!mounted) return;

                // Single state update with all changes
                setCategoriesState({
                    loading: false,
                    error: null,
                    categories,
                    cardsShown: val || 0,
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
