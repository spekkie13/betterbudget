import {View, Text, useColorScheme, TouchableOpacity} from "react-native";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Title from "@/app/general/Title";
import {styles_AddNew} from "@/styles/styles_AddNew";
import {useRouter } from "expo-router";

const addNew = () => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_AddNew(currentTheme)
    const router = useRouter()

    return(
        <View style={styles.container}>
            <Title text="Add a new Item"/>
            <View style={styles.itemView}>
                <TouchableOpacity
                    style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                    onPress={() => router.replace("/(tabs)/category/AddCategory")}>
                    <FontAwesome name="briefcase" size={32} color={currentTheme.colors.textColor}/>
                    <Text style={styles.item}>Add a category</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemView}>
                <TouchableOpacity
                    style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                    onPress={() => router.replace("/(tabs)/expense/addExpense")}>
                    <FontAwesome name="dollar" size={32} color={currentTheme.colors.textColor}/>
                    <Text style={styles.item}>Add an expense</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default addNew;
