import {Text, TouchableOpacity, useColorScheme, View} from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Title from "@/app/general/Title"
import {useRouter} from "expo-router"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import {styles_CategoryManagement} from "@/styles/styles_CategoryManagement"

const CategoryManagement = () => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_CategoryManagement(currentTheme)
    const router = useRouter()

    function Add() {
        router.replace("/(tabs)/category/AddCategory")
    }
    return (
        <View>
            <Title text={'home management'} />
            <View style={styles.container}>
                <View style={styles.itemBlock}>
                    <TouchableOpacity style={styles.touchable} onPress={Add}>
                        <View
                            style={styles.menuItem}>
                            <FontAwesome name={'plus'} color={currentTheme.colors.textColor} size={20} />
                            <Text style={styles.text}>
                                Add Category
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemBlock}>
                    <TouchableOpacity style={styles.touchable}>
                        <View style={styles.menuItem}>
                            <FontAwesome name={'pencil'} color={currentTheme.colors.textColor} size={20} />
                            <Text style={styles.text}>
                                Edit Categories
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemBlock}>
                    <TouchableOpacity style={styles.touchable}>
                        <View
                            style={styles.menuItem}>
                            <FontAwesome name={'circle'} color={currentTheme.colors.textColor} size={20} />
                            <Text style={styles.text}>
                                Delete Categories
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemBlock}>
                    <TouchableOpacity style={styles.touchable}>
                        <View
                            style={styles.menuItem}>
                            <FontAwesome name={'eye'} color={currentTheme.colors.textColor} size={20} />
                            <Text style={styles.text}>
                                View Categories
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CategoryManagement
