import {Text, useColorScheme, View} from "react-native";
import React from "react";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_customButton} from "@/styles/general/styles_customButton";

const CustomButton = ({text, color}) => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_customButton(currentTheme, color)

    return (
        <View style={styles.buttonView}>
            <Text style={styles.buttonText}>{text}</Text>
        </View>
    )
}

export default CustomButton
