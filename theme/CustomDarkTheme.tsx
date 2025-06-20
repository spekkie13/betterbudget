import {DarkTheme} from "@react-navigation/native"

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#121212',
        backgroundDark: '#191919',
        oppositeColor: '#FFFAFA',
        textColor: '#FFFAFA',
        successColor: '#00FF00',
        failureColor: '#DC3545',
        secondary: '#0F203C',
        tertiary: '#1A375E'
    }
}

export default CustomDarkTheme
