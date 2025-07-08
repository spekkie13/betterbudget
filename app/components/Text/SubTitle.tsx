import {styles_subtitle} from "@/styles/general/styles_subtitle"
import {Text, View} from 'react-native'
import {useThemeContext} from "@/theme/ThemeContext"

const SubTitle = ({text}) => {
    const { currentTheme } = useThemeContext()
    const styles = styles_subtitle(currentTheme)

    return (
        <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{text}</Text>
        </View>
    )
}

export default SubTitle
