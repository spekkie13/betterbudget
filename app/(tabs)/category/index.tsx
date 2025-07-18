import {ActivityIndicator, SafeAreaView, ScrollView, Text, View,} from 'react-native'
import React, {useContext} from 'react'
import {AuthContext} from '@/app/ctx'
import {useRouter} from 'expo-router'
import {styles_categoryOverview} from '@/styles/tabs/category/styles_categoryOverview'
import { Title, Button } from '@/app/components/General'
import {useCategories} from "@/hooks"
import CategoriesList from "@/app/components/UI/Category/CategoriesList"
import {useThemeContext} from "@/theme/ThemeContext"

const CategoryOverviewScreen = () => {
    const {user} = useContext(AuthContext)
    const router = useRouter()

    const {categories, loading, error} = useCategories({userId: user.id})
    const cardsShown = categories.length

    const { currentTheme } = useThemeContext()
    const styles = styles_categoryOverview(currentTheme)

    if (!user) {
        router.replace('/')
        return
    }

    if (loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Overview'}/>
            <View style={styles.buttonView}>
                <Button
                    text='Add Category'
                    onPress={() => router.replace('/(tabs)/category/AddCategory')}/>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {categories.length === 0 ? (
                    <Text style={styles.text}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categories} max={cardsShown} theme={currentTheme}/>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoryOverviewScreen
