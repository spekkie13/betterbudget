import {DefaultTheme} from "react-native-paper"

const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFAFA',
        backgroundDark: '#F5FCFF',
        secondary: '#FFFAFA',
        textColor: '#121212',
        titleColor: '#3BA6B0',
        successColor: '#00FF00',
        failureColor: '#DC3545',
        borderColor: '#000000'
    }
}

export default CustomDefaultTheme
