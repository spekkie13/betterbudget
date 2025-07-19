import React, {useCallback, useMemo} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {Router, useRouter} from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {styles_AddNew} from "@/styles/tabs/home/styles_AddNew"
import {useThemeContext} from "@/theme/ThemeContext"

const AddNew = () => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_AddNew(currentTheme), [currentTheme])

    const router : Router = useRouter()
    const handleNavigation = useCallback((route: any) => {
        router.replace(route)
    }, [router])

    return (
        <View style={styles.container}>
            <View style={styles.addItems}>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => handleNavigation('/add/addCategory')}
                    >
                        <FontAwesome name="briefcase" size={32} color={currentTheme.colors.textColor}/>
                        <Text style={styles.item}>Add a category</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => handleNavigation('/(tabs)/add/addExpense')}
                    >
                        <FontAwesome name="dollar" size={32} color={currentTheme.colors.textColor}/>
                        <Text style={styles.item}>Add an expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemView}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => handleNavigation('/(tabs)/add/addIncome')}
                    >
                        <FontAwesome name="money" size={32} color={currentTheme.colors.textColor}/>
                        <Text style={styles.item}>Add an income</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddNew
