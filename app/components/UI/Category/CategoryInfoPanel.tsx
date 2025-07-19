import React, {useMemo} from "react"
import {ActivityIndicator, Text, View} from "react-native"
import {styles_categoryInfoPanel} from "@/styles/tabs/category/styles_categoryInfoPanel"
import { SubTitle } from "@/app/components/General"
import {useCategories} from "@/hooks"
import CategoriesList from "@/app/components/UI/Category/CategoriesList"
import {useThemeContext} from "@/theme/ThemeContext";

const CategoryInfoPanel = () => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryInfoPanel(currentTheme), [currentTheme])

    let {categoriesState} = useCategories({selectedOnly: true})
    if (categoriesState.cardsShown === undefined) {
        categoriesState.cardsShown = 0
    }

    const title: string = 'Top ' + categoriesState.cardsShown + ' categories'

    if (categoriesState.loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }


    if (categoriesState.error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{categoriesState.error}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SubTitle text={title}/>
            <View style={styles.categoryView}>
                {categoriesState?.categories?.length === 0 ? (
                    <Text style={styles.notFoundText}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categoriesState.categories} max={categoriesState.cardsShown}/>
                )}
            </View>
        </View>
    )
}

export default CategoryInfoPanel
