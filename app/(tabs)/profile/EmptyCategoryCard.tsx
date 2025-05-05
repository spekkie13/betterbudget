import {TouchableOpacity, useColorScheme, View} from "react-native";
import {useState} from "react";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

const EmptyCategoryCard = () => {
    const [manageCategoryVisible, setManageCategoryVisible] = useState(false);
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme

    return(
        <TouchableOpacity
            onPress={() => setManageCategoryVisible(true)}>
            <View
                style={{
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    borderWidth: 1,
                    margin: 5,
                    width: 185,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: currentTheme.colors.secondary,
                    borderColor: currentTheme.colors.primary
                }}>
            </View>
        </TouchableOpacity>
    )
}

export default EmptyCategoryCard;
