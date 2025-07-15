import {DarkTheme} from "@react-navigation/native"
import {DefaultTheme} from "react-native-paper";

export const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        accent: '#3BA6B0',
        accentHover: '#32939D',
        accentMuted: '#A7DDE1',
        background: '#FFFAFA',
        textColor: '#121212',
        successColor: '#00FF00',
        failureColor: '#DC3545',
        borderColor: '#000000'
    },
    spacing: {
        xs: 5,
        sm: 10,
        md: 25,
        lg: 50,
        xl: 100,
    },
    radius: {
        xs: 5,
        sm: 10,
        md: 25,
        lg: 50,
        xl: 100,
    }
}

export const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        accent: '#3BA6B0',
        accentHover: '#32939D',
        accentMuted: '#A7DDE1',
        background: '#121212',
        textColor: '#FFFAFA',
        successColor: '#00FF00',
        failureColor: '#DC3545',
        borderColor: '#FFFFFF'
    },
    spacing: CustomLightTheme.spacing,
    radius: CustomLightTheme.radius,
}
