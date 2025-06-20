import React, {useContext} from "react";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";
import { AuthContext } from "@/app/ctx";
import { styles_categoryInfoPanel } from "@/styles/styles_categoryInfoPanel";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import SubTitle from "@/app/general/SubTitle";
import { useCategories } from "@/hooks/useCategories";
import CategoriesList from "@/app/(tabs)/category/CategoriesList";

const CategoryInfoPanel = () => {
    const { user } = useContext(AuthContext);

    const { categories, loading, error, cardsShown } = useCategories({ userId: user?.id, selectedOnly: true });
    const title: string = 'Top ' + cardsShown + ' categories';

    const colorScheme = useColorScheme();
    const currentTheme =
        colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categoryInfoPanel(currentTheme);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SubTitle text={title} />
            <View style={styles.categoryView}>
                {categories.length === 0 ? (
                    <Text style={styles.notFoundText}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categories} max={cardsShown} />
                )}
            </View>
        </View>
    );
};

export default CategoryInfoPanel;
