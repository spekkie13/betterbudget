import React, {useCallback, useContext, useState} from "react"
import {ActivityIndicator, Text, View} from "react-native"
import {AuthContext} from "@/app/ctx"
import {styles_categoryInfoPanel} from "@/styles/tabs/category/styles_categoryInfoPanel"
import SubTitle from "@/app/components/Text/SubTitle"
import {useCategories} from "@/hooks/useCategories"
import CategoriesList from "@/app/components/UI/Category/CategoriesList"
import {useFocusEffect} from "@react-navigation/native";

const CategoryInfoPanel = ({ theme }: { theme: any }) => {
    const {user} = useContext(AuthContext)
    const styles = styles_categoryInfoPanel(theme)

    const [refreshKey, setRefreshKey] = useState(0)

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1)
        }, [])
    )

    let {categories, loading, error, cardsShown} = useCategories({userId: user?.id, selectedOnly: true, refreshTrigger: refreshKey})
    if (cardsShown === undefined) {
        cardsShown = 0
    }

    const title: string = 'Top ' + cardsShown + ' categories'

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SubTitle text={title}/>
            <View style={styles.categoryView}>
                {categories.length === 0 ? (
                    <Text style={styles.notFoundText}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categories} max={cardsShown} theme={theme}/>
                )}
            </View>
        </View>
    )
}

export default CategoryInfoPanel
