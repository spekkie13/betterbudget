import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Title from "@/app/components/Text/Title";
import {styles_AddNew} from "@/styles/tabs/home/styles_AddNew";
import {useThemeContext} from "@/theme/ThemeContext";

const AddNew = () => {
    const { currentTheme } = useThemeContext();
    const styles = styles_AddNew(currentTheme);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Title text="Add a new Item"/>

            <View style={styles.addItems}>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => router.replace("/(tabs)/category/AddCategory")}
                    >
                        <FontAwesome name="briefcase" size={32} color={currentTheme.colors.textColor}/>
                        <Text style={styles.item}>Add a category</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => router.replace("/(tabs)/add/addExpense")}
                    >
                        <FontAwesome name="dollar" size={32} color={currentTheme.colors.textColor}/>
                        <Text style={styles.item}>Add an expense</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddNew;
