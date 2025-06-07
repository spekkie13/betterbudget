import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '@/app/ctx';
import { Link } from 'expo-router';
import { styles_categoryOverview } from '@/styles/styles_categoryOverview';
import CustomDarkTheme from '@/theme/CustomDarkTheme';
import CustomDefaultTheme from '@/theme/CustomDefaultTheme';
import Title from '@/app/general/Title';
import CustomButton from '@/app/general/CustomButton';
import {useCategories} from "@/hooks/useCategories";
import CategoriesList from "@/app/(tabs)/category/CategoriesList";

const CategoryOverviewScreen = () => {
    const { user } = useContext(AuthContext);
    const { categories, loading, error } = useCategories({ userId: user.id });
    const cardsShown = categories.length

    const colorScheme = useColorScheme();
    const currentTheme =
        colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categoryOverview(currentTheme);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>{error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Overview'} />
            <View style={styles.buttonView}>
                <Link href="/(tabs)/category/AddCategory">
                    <CustomButton text={'Add Category'} color="" />
                </Link>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {categories.length === 0 ? (
                    <Text style={{ color: "#ccc", marginTop: 10 }}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categories} max={cardsShown} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryOverviewScreen;
