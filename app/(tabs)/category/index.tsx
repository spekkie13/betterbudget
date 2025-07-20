import {ActivityIndicator, SafeAreaView, ScrollView, Text, View,} from 'react-native'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {AuthContext} from '@/app/ctx'
import {useRouter} from 'expo-router'
import {styles_categoryOverview} from '@/styles/tabs/category/styles_categoryOverview'
import { Title, Button } from '@/app/components/General'
import CategoriesList from "@/app/components/UI/Category/CategoriesList"
import {useThemeContext} from "@/theme/ThemeContext"
import {useCategories} from "@/hooks";

const CategoryOverviewScreen = () => {
    const { userState } = useContext(AuthContext)
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryOverview(currentTheme), [currentTheme])
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const { categoriesState: { categories, loading, error } } = useCategories({
        selectedOnly: false,
        refreshTrigger
    })

    const handleAddCategory = useCallback(() => {
        router.replace('/add/addCategory')
    }, [router])

    const handleRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
    }, [])

    if (!userState.user) {
        router.replace('/')
        return null
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={currentTheme.colors.primary} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{error}</Text>
                <Button
                    text='Retry'
                    onPress={handleRefresh}
                />
            </View>
        )
    }

    const isEmpty = categories.length === 0

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Overview'} />
            <View style={styles.buttonView}>
                <Button
                    text='Add Category'
                    onPress={handleAddCategory}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {isEmpty ? (
                    <Text style={styles.text}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList
                        categories={categories}
                        max={categories.length}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}


export default CategoryOverviewScreen
