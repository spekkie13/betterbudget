import {Text, View} from "react-native"
import React from "react"
import {styles_customButton} from "@/styles/general/styles_customButton"
import {useThemeContext} from "@/theme/ThemeContext"

const CustomButton = ({text, color, textColor}) => {
    const { currentTheme } = useThemeContext()
    const styles = styles_customButton(currentTheme, color, textColor)

    return (
        <View style={styles.buttonView}>
            <Text style={styles.buttonText}>{text}</Text>
        </View>
    )
}

export default CustomButton
