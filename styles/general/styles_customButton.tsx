import {StyleSheet} from "react-native"

export const styles_customButton = (currentTheme, color, textColor) => StyleSheet.create({
    buttonView: {
        width: 225,
        height: 40,
        backgroundColor: color || currentTheme.colors.accent,
        alignItems: 'center',
        paddingTop: 'auto',
        borderRadius: 25,
        marginBottom: 5,
    },
    buttonText: {
        color: textColor || currentTheme.colors.textColor,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 40,
        fontSize: 16
    }
})
