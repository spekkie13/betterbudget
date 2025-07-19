import {ActivityIndicator, SafeAreaView, ScrollView, Text, View,} from 'react-native'
import React, {useCallback, useContext, useMemo} from 'react'
import {AuthContext} from '@/app/ctx'
import {useRouter} from 'expo-router'
import {styles_categoryOverview} from '@/styles/tabs/category/styles_categoryOverview'
import { Title, Button } from '@/app/components/General'
import {useCategories} from "@/hooks"
import CategoriesList from "@/app/components/UI/Category/CategoriesList"
import {useThemeContext} from "@/theme/ThemeContext"

const CategoryOverviewScreen = () => {
    const {userState} = useContext(AuthContext)
    const router = useRouter()

    const {categoriesState} = useCategories({selectedOnly: false})
    const cardsShown = categoriesState.categories.length

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryOverview(currentTheme), [currentTheme])

    const handleAddCategory = useCallback(() => {
        router.replace('/add/addCategory')
    }, [router])

    if (!userState.user) {
        router.replace('/')
        return
    }

    if (categoriesState.loading)
        return (
        <View style={styles.container}>
            <ActivityIndicator/>
        </View>
        )
    if (categoriesState.error) return <Text>{categoriesState.error}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Overview'}/>
            <View style={styles.buttonView}>
                <Button
                    text='Add Category'
                    onPress={handleAddCategory}/>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {categoriesState.categories.length === 0 ? (
                    <Text style={styles.text}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categoriesState.categories} max={cardsShown} />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoryOverviewScreen
