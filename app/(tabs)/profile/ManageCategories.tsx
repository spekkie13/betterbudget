import { View, useColorScheme, TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { Padding_MEDIUM } from "@/constants/UIConstants";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import Title from "@/app/general/Title";
import CustomButton from "@/app/general/CustomButton";
import ManageCategoryModal from "@/app/(tabs)/profile/ManageCategoryModal";
import { useContext, useState } from "react";
import { getCategories, getSelectedCategories } from "@/api/CategoryController";
import { AuthContext } from "@/app/ctx";
import {getUserPreferenceByName, updateAllPreferences } from "@/api/PreferenceController";
import CategoryCard from "@/app/(tabs)/category/CategoryCard";
import {useAsyncEffect} from "@/hooks/useAsyncEffect";

const ManageCategories = () => {
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([null, null, null, null]); // State for each view
    const [currentIndex, setCurrentIndex] = useState(null); // Index of the clicked view
    const [categoriesShown, setCategoriesShown] = useState(0);

    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const categoryList = [];

    useAsyncEffect(async () => {
        const categoryList = await getCategories(user.id);
        const selectedCategories = await getSelectedCategories(user.id);
        setSelectedItems(selectedCategories);
        setItems(categoryList);

        let cardsPreference = await getUserPreferenceByName(user.id, "Cards")
        setCategoriesShown(cardsPreference.numberValue)
    }, [user.id]);

    // Filter out selected items from the available items
    const filteredItems = items.filter(
        (item) => !selectedItems.some((selected) => selected?.id === item.id)
    );

    // Handler for when a category is selected
    const handleCategorySelect = (item : any) => {
        const updatedItems = [...selectedItems];
        updatedItems[currentIndex] = item; // Update the specific view's state
        setSelectedItems(updatedItems);
        setModalVisible(false); // Close the modal
    };

    for (let i = 0; i < categoriesShown; i += 2) {
        categoryList.push(
            <View style={{ flexDirection: "row" }} key={`row-${i}`}>
                {[0, 1].map((offset) => {
                    const index = i + offset;
                    if (index >= categoriesShown) return null; // Skip out-of-bound indices

                    return (
                        <TouchableOpacity
                            key={`category-${index}`}
                            onPress={() => {
                                setCurrentIndex(index);
                                setModalVisible(true);
                            }}
                        >
                            {selectedItems[index] === null ? (
                                <View
                                    style={{
                                        borderStyle: selectedItems[index] ? "solid" : "dashed",
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        margin: 5,
                                        width: 185,
                                        height: 100,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: selectedItems[index]
                                            ? currentTheme.colors.primary
                                            : currentTheme.colors.secondary,
                                        borderColor: currentTheme.colors.primary,
                                    }}
                                >
                                    <Text style={{ color: currentTheme.colors.textColor }}>
                                        Select a Category
                                    </Text>
                                </View>
                            ) : (
                                <CategoryCard category={selectedItems[index]} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    return (
        <View
            style={{
                backgroundColor: currentTheme.colors.background,
                flex: 1,
                paddingTop: Padding_MEDIUM,
            }}
        >
            <Title text={"Manage Categories"} />
            <View>{categoryList}</View>
            <View>
                <ManageCategoryModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={handleCategorySelect} // Pass the selection handler
                    items={filteredItems} // Pass the filtered list of items
                />
            </View>
            <View style={{ alignItems: "center", marginTop: 5 }}>
                <TouchableOpacity
                    onPress={async () => {
                        await updateAllPreferences(user.id, selectedItems);
                    }}
                    style={{ marginBottom: 5 }}
                >
                    <CustomButton text="Save" color="green" />
                </TouchableOpacity>
                <Link href="/(tabs)/profile/">
                    <CustomButton text="Back" color="red" />
                </Link>
            </View>
        </View>
    );
};

export default ManageCategories;
