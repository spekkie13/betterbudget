import React, { useContext, useState } from "react";
import { Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Link } from "expo-router";

import Title from "@/app/general/Title";
import CustomButton from "@/app/general/CustomButton";

import { AuthContext } from "@/app/ctx";

import { genericFailureMessage, successCreateMessage } from "@/constants/MessagesConstants";
import { styles_addCategory } from "@/styles/styles_addCategory";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {CATEGORY_WITH_BUDGET_BASE_URL} from "@/constants/APIConstants";
import {getNextPeriod} from "@/api/PeriodController";
import {checkIfCategoryExists} from "@/api/CategoryController";

const AddCategory = () => {
    const [category, setCategory] = useState("");
    const [budget, setBudget] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const { user } = useContext(AuthContext);
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_addCategory(theme);

    const showTemporaryMessage = (type: "success" | "error", message: string) => {
        if (type === "success") {
            setSuccessMessage(message);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setCategory('')
            setBudget('')
        } else {
            setErrorMessage(message);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const handleAddCategory = async (): Promise<void> => {
        if (!category || !budget) {
            showTemporaryMessage("error", "Please fill in the required information");
            return;
        }

        const exists = await checkIfCategoryExists(category, user.id);
        if (exists) {
            showTemporaryMessage("error", "The category already exists!");
        } else {
            const period = await getNextPeriod();

            const payload = {
                category: {
                    name: category,
                    color: theme.colors.background,
                    icon: "N/A",
                    userId: user.id,
                },
                budget: {
                    amount: parseInt(budget),
                    userId: user.id,
                    periodId: period.id,
                },
                result: {
                    totalSpent: 0,
                    percentageSpent: 0,
                    userId: user.id,
                    periodId: period.id,
                }
            };

            try {
                const response = await fetch(`${CATEGORY_WITH_BUDGET_BASE_URL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    console.error("Failed to create category and budget")
                }

                const data = await response.json();
                console.log(data);
                showTemporaryMessage("success", successCreateMessage);
            } catch (error) {
                console.error("Error in handleAddCategory:", error);
                showTemporaryMessage("error", genericFailureMessage);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Title text="Add category" />

            {showSuccess && (
                <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {showError && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}

            <View style={styles.textView}>
                <TextInput
                    style={styles.input}
                    label="Category name"
                    textAlign="center"
                    value={category}
                    onChangeText={setCategory}
                />
            </View>

            <View style={styles.textView}>
                <TextInput
                    style={styles.input}
                    label="Budget"
                    value={budget}
                    onChangeText={setBudget}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    placeholderTextColor={theme.colors.textColor}
                />
            </View>

            <View style={styles.addButtonView}>
                <TouchableOpacity onPress={handleAddCategory} style={styles.buttonView}>
                    <CustomButton text="Add" color="" />
                </TouchableOpacity>

                <Link href="/(tabs)/expense/">
                    <CustomButton text="Back" color="" />
                </Link>
            </View>
        </View>
    );
};

export default AddCategory;
