import { ActivityIndicator, SafeAreaView, ScrollView, Text, useColorScheme, View } from 'react-native'
import Title from '@/app/general/Title'
import React, {useContext, useEffect, useState} from 'react'
import CategoryCard from '@/app/(tabs)/category/CategoryCard'
import {fetchCategories} from "@/api/CategoryController"
import {genericFailureMessage} from "@/constants/MessagesConstants"
import {AuthContext} from "@/app/ctx"
import {Link} from "expo-router"
import {styles_categoryOverview} from "@/styles/styles_categoryOverview"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import CustomButton from "@/app/general/CustomButton";

const CategoryOverviewScreen = () => {
    const pairViews: React.JSX.Element[] = []
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext) // Get the current user from context

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryOverview(currentTheme)

    useEffect(() : void => {
        const userId = user?.id
        const fetchData = async () : Promise<void> => {
            try{
                if(categories.length === 0){
                    const data = await fetchCategories(userId)
                    setCategories(data)
                }
            }catch(err){
                console.log(err)
                setError(err)
            }finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading)
        return <ActivityIndicator />

    if (error)
        return <Text>Error: {genericFailureMessage}</Text>

    if(categories.length > 0) {
        for (let i = 0; i < categories.length-1; i += 2) {
            const pairView = (
                <View
                    key={i}
                    style={styles.body}>
                    <View style={styles.cardView}>
                        <CategoryCard category={categories[i]}/>
                    </View>
                    <View style={styles.cardView}>
                        <CategoryCard category={categories[i + 1]}/>
                    </View>
                </View>
            )

            pairViews.push(pairView)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Overview'} />
            <View style={styles.buttonView}>
                <Link href="/(tabs)/category/AddCategory">
                    <CustomButton text={'Add Category'} color="" />
                </Link>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>{pairViews}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoryOverviewScreen
