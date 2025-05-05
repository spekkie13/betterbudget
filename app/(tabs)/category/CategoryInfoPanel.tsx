import React, {useContext, useEffect, useState} from "react"
import {Category} from "@/models/category"
import {fetchSelectedCategories} from "@/api/CategoryController"
import {ActivityIndicator, Text, useColorScheme, View} from "react-native"
import CategoryInfoCard from "./CategoryInfoCard"
import Preferences from "@/models/preferences"
import {genericFailureMessage} from "@/constants/MessagesConstants"
import {AuthContext} from "@/app/ctx"
import {styles_categoryInfoPanel} from "@/styles/styles_categoryInfoPanel"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import CategoryCard from "@/app/(tabs)/category/CategoryCard";

const CategoryInfoPanel = () => {
    const cardsShown: string = Preferences.get('Cards on Home Page')
    const cards : number = parseInt(cardsShown)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user } = useContext(AuthContext)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryInfoPanel(currentTheme)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            if(categories.length === 0){
                try {
                    const fetchedCategories: Category[] = await fetchSelectedCategories(user?.id)
                    setCategories(fetchedCategories)
                } catch (err) {
                    setError(genericFailureMessage)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>{genericFailureMessage}</Text>
    }

    const pairViews: React.JSX.Element[] = categories
        .map((_, i) => i)
        .filter(i => i % 2 === 0 && i < cards)
        .map(i => (
            <View
                key={i}
                style={styles.card}>
                <CategoryCard category={categories[i]}/>
                <CategoryCard category={categories[i + 1]}/>
            </View>))

    return(
        <View style={styles.container}>
            {pairViews}
        </View>
    )
}

export default CategoryInfoPanel
