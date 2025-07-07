import {Text, View} from "react-native";
import React from "react";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_customButton} from "@/styles/general/styles_customButton";
import {preferenceStore} from "@/hooks/preferenceStore";

const CustomButton = ({text, color, textColor}) => {
    const colorScheme = preferenceStore.get('colorScheme')?.stringValue;
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_customButton(currentTheme, color, textColor)

    return (
        <View style={styles.buttonView}>
            <Text style={styles.buttonText}>{text}</Text>
        </View>
    )
}

export default CustomButton
