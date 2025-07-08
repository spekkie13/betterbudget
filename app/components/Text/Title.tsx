import {styles_title} from "@/styles/general/styles_title"
import {Text, View} from 'react-native'
import {useThemeContext} from "@/theme/ThemeContext"

const Title = ({text}) => {
    const { currentTheme } = useThemeContext()
    const styles = styles_title(currentTheme)

    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>{text}</Text>
        </View>
    )
}

export default Title
