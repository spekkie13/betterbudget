import {useEffect, useState} from "react"
import {getCategories, getSelectedCategories} from "@/api"
import {Category} from "@/types/models"
import {preferenceStore} from "@/hooks"
import {CategoriesProps} from "@/types/props"

export const useCategories = ({userId, selectedOnly = false, refreshTrigger = 0 }: CategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const cardsShown = preferenceStore.get('cards')?.numberValue
    const categoryPreferences = preferenceStore.nameContains('category').length > 0

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId === undefined) {
                    return
                }
                if (selectedOnly && categoryPreferences) {
                    const selected = await getSelectedCategories(userId, cardsShown)
                    setCategories(selected)
                } else {
                    const all = await getCategories(userId)
                    setCategories(all)
                }
            } catch (err) {
                console.error(err)
                setError("Failed to load categories")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [userId, selectedOnly, refreshTrigger])

    return {categories, loading, error, cardsShown}
}
