import {DefaultTheme} from "react-native-paper"

const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFAFA',
        backgroundDark: '#F5FCFF',
        textColor: '#121212',
        successColor: '#00FF00',
        failureColor: '#DC3545',
    }
}

export default CustomDefaultTheme
