import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Title from "@/app/general/Title";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import { styles_AddNew } from "@/styles/styles_AddNew";

const AddNew = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_AddNew(theme);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Title text="Add a new Item" />

            <View style={styles.itemView}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => router.replace("/(tabs)/category/AddCategory")}
                >
                    <FontAwesome name="briefcase" size={32} color={theme.colors.textColor} />
                    <Text style={styles.item}>Add a category</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemView}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => router.replace("/(tabs)/expense/addExpense")}
                >
                    <FontAwesome name="dollar" size={32} color={theme.colors.textColor} />
                    <Text style={styles.item}>Add an expense</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddNew;
