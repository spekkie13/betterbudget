import {styles_subtitle} from "@/styles/general/styles_subtitle"
import {Text, useColorScheme, View} from 'react-native'
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const SubTitle = ({text}) => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_subtitle(currentTheme)

    return (
        <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{text}</Text>
        </View>
    )
}

export default SubTitle
