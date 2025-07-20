import React, {useCallback, useContext, useMemo, useState} from "react"
import {View} from "react-native"
import {useRouter} from "expo-router"
import {Title, Button, InputField, MessageBanner} from '@/app/components/General'
import {AuthContext} from "@/app/ctx"
import {genericFailureMessage, successCreateMessage, CATEGORY_WITH_BUDGET_BASE_URL} from "@/constants"
import {styles_addCategory} from "@/styles/tabs/category/styles_addCategory"
import {getNextPeriod, checkIfCategoryExists, createNewPreference} from '@/api'
import {useThemeContext} from "@/theme/ThemeContext"
import {UserPreference} from "@/types/models";
import {preferenceStore} from "@/hooks";

const AddCategory = () => {
    const [categoryState, setCategoryState] = useState({
        category: "",
        budget: "",
        message: '',
        status: false
    })
    const {userState} = useContext(AuthContext)
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_addCategory(currentTheme), [currentTheme])

    const showMessage = (message: string) => {
        setCategoryState({
            ...categoryState,
            message: message,
        })
        setTimeout(() => setCategoryState({
            ...categoryState,
            message: ''
        }), 3000)
    }

    const handleAddCategory = async (): Promise<void> => {
        if (!categoryState.category || !categoryState.budget) {
            setCategoryState(prev => ({
                ...prev,
                message: "Please fill in the required information",
                status: false,
            }))
            showMessage(categoryState.message)
            return
        }

        const exists = await checkIfCategoryExists(categoryState.category, userState?.user?.id)
        if (exists) {
            setCategoryState(prev => ({
                ...prev,
                message: "The category already exists!",
                status: false,
            }))
            showMessage(categoryState.message)
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
                    setCategoryState(prev => ({
                        ...prev,
                        message: genericFailureMessage,
                        status: false
                    }))
                    console.error("Failed to create category and budget")
                }
                const data = await response.json()

                const categoryPrefs = preferenceStore.nameContains("category")
                let highestPrefId: number;
                if (categoryPrefs.length > 0) {
                    highestPrefId = categoryPrefs.reduce((max, pref) => {
                        const currentNumber = pref.numberValue || 0;
                        return currentNumber > max ? currentNumber : max;
                    }, 0) + 1
                }else{
                    highestPrefId = 1
                }
                const preferenceData = {
                    id: 0,
                    name: `category ${highestPrefId}`,
                    numberValue: data.category.id,
                    userId: userState.user.id,
                }
                await createNewPreference(new UserPreference(preferenceData))
                preferenceStore.set(new UserPreference(preferenceData))
                setCategoryState(prev => ({
                    ...prev,
                    message: successCreateMessage,
                    status: true,
                    category: '',
                    budget: '',
                }))
            } catch (error) {
                setCategoryState(prev => ({
                    ...prev,
                    message: "Error in handleAddCategory",
                    status: false,
                }))
                console.error("Error in handleAddCategory:", error)
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
            <MessageBanner message={categoryState.message ?? ''} type={categoryState.status ? 'success' : 'error'}/>
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
