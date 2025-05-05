import {StyleSheet} from "react-native";

export const styles_customButton = (currentTheme, color) => StyleSheet.create({
    buttonView: {
        width: 225,
        height: 40,
        backgroundColor: color || currentTheme.colors.primary,
        alignItems: 'center',
        paddingTop: 'auto',
        borderRadius: 25,
        marginBottom: 5,
    },
    buttonText: {
        color: currentTheme.colors.textColor,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 40,
        fontSize: 16
    }
})
