import React, {useCallback, useContext, useMemo, useState} from "react"
import {Text, View} from "react-native"
import {useRouter} from "expo-router"
import { Title, Button, InputField } from '@/app/components/General'
import {AuthContext} from "@/app/ctx"
import {genericFailureMessage, successCreateMessage, CATEGORY_WITH_BUDGET_BASE_URL} from "@/constants"
import {styles_addCategory} from "@/styles/tabs/category/styles_addCategory"
import { getNextPeriod, checkIfCategoryExists,  } from '@/api'
import {useThemeContext} from "@/theme/ThemeContext"

const AddCategory = () => {
    const [categoryState, setCategoryState] = useState({
        category: "",
        budget: "",
        successMessage: "",
        errorMessage: "",
        showSuccess: false,
        showError: false,
    })
    const {userState} = useContext(AuthContext)
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_addCategory(currentTheme), [currentTheme])

    const showTemporaryMessage = (type: "success" | "error", message: string) => {
        if (type === "success") {
            setCategoryState({
                ...categoryState,
                successMessage: message,
                showSuccess: true
            })
            setTimeout(() => setCategoryState({
                ...categoryState,
                showSuccess: false
            }), 3000)

            setCategoryState({
                ...categoryState,
                category: '',
                budget: '',
            })
        } else {
            setCategoryState({
                ...categoryState,
                errorMessage: message,
                showError: true
            })
            setTimeout(() => setCategoryState({
                ...categoryState,
                showError: false
            }), 3000)
        }
    }

    const handleAddCategory = async (): Promise<void> => {
        if (!categoryState.category || !categoryState.budget) {
            showTemporaryMessage("error", "Please fill in the required information")
            return
        }

        const exists = await checkIfCategoryExists(categoryState.category, userState?.user?.id)
        if (exists) {
            showTemporaryMessage("error", "The category already exists!")
        } else {
            const period = await getNextPeriod()

            const payload = {
                category: {
                    name: categoryState.category,
                    color: currentTheme.colors.background,
                    icon: "N/A",
                    userId: userState?.user?.id,
                },
                budget: {
                    amount: parseInt(categoryState.budget),
                    userId: userState.user.id,
                    periodId: period.id,
                },
                result: {
                    totalSpent: 0,
                    percentageSpent: 0,
                    userId: userState.user.id,
                    periodId: period.id,
                }
            }

            try {
                const response = await fetch(`${CATEGORY_WITH_BUDGET_BASE_URL}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    console.error("Failed to create category and budget")
                }

                const data = await response.json()
                console.log(data)
                showTemporaryMessage("success", successCreateMessage)
            } catch (error) {
                console.error("Error in handleAddCategory:", error)
                showTemporaryMessage("error", genericFailureMessage)
            }
        }
    }

    const handleUpdateField = useCallback((fieldName: string) => (value: string) => {
        setCategoryState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }, [])

    const handleBack = useCallback(() => {
        router.replace('/(tabs)/add')
    }, [router])
    return (
        <View style={styles.container}>
            <Title text="Add category"/>

            {categoryState.showSuccess && (
                <Text style={styles.successMessage}>{categoryState.successMessage}</Text>
            )}

            {categoryState.showError && (
                <Text style={styles.errorMessage}>{categoryState.errorMessage}</Text>
            )}

            <View style={styles.textView}>
                <InputField
                    label={'Category Name'}
                    value={categoryState.category}
                    onChange={handleUpdateField('category')}
                    secure={false} />
            </View>

            <View style={styles.textView}>
                <InputField
                    label={'Budget'}
                    value={categoryState.budget}
                    onChange={handleUpdateField('budget')}
                    secure={false} />
            </View>

            <View style={styles.addButtonView}>
                <Button
                    text='Add'
                    onPress={handleAddCategory}
                    style={styles.buttonView}/>

                <Button text='Back'
                        onPress={handleBack}
                        style={styles.buttonView}/>
            </View>
        </View>
    )
}

export default AddCategory
