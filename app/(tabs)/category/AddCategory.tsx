import React, {useContext, useState} from "react"
import {Text, View} from "react-native"
import {useRouter} from "expo-router"
import Title from "@/app/components/Text/Title"
import {AuthContext} from "@/app/ctx"
import {genericFailureMessage, successCreateMessage} from "@/constants/messageConstants"
import {styles_addCategory} from "@/styles/tabs/category/styles_addCategory"
import {CATEGORY_WITH_BUDGET_BASE_URL} from "@/constants/apiConstants"
import {getNextPeriod} from "@/api/PeriodController"
import {checkIfCategoryExists} from "@/api/CategoryController"
import {useThemeContext} from "@/theme/ThemeContext"
import { InputField } from "@/app/components/UI/InputField"
import Button from "@/app/components/UI/General/Button";

const AddCategory = () => {
    const [category, setCategory] = useState("")
    const [budget, setBudget] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const {user} = useContext(AuthContext)
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = styles_addCategory(currentTheme)

    const showTemporaryMessage = (type: "success" | "error", message: string) => {
        if (type === "success") {
            setSuccessMessage(message)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
            setCategory('')
            setBudget('')
        } else {
            setErrorMessage(message)
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
        }
    }

    const handleAddCategory = async (): Promise<void> => {
        if (!category || !budget) {
            showTemporaryMessage("error", "Please fill in the required information")
            return
        }

        const exists = await checkIfCategoryExists(category, user.id)
        if (exists) {
            showTemporaryMessage("error", "The category already exists!")
        } else {
            const period = await getNextPeriod()

            const payload = {
                category: {
                    name: category,
                    color: currentTheme.colors.background,
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

    return (
        <View style={styles.container}>
            <Title text="Add category"/>

            {showSuccess && (
                <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {showError && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}

            <View style={styles.textView}>
                <InputField
                    label={'Category Name'}
                    value={category}
                    onChange={setCategory}
                    secure={false} />
            </View>

            <View style={styles.textView}>
                <InputField
                    label={'Budget'}
                    value={budget}
                    onChange={setBudget}
                    secure={false} />
            </View>

            <View style={styles.addButtonView}>
                <Button
                    text='Add'
                    onPress={handleAddCategory}
                    style={styles.buttonView}/>

                <Button text='Back'
                        onPress={() => router.replace('/(tabs)/add')}
                        style={styles.buttonView}/>
            </View>
        </View>
    )
}

export default AddCategory
