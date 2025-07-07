import {styles_title} from "@/styles/general/styles_title"
import {Text, View} from 'react-native'
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import {preferenceStore} from "@/hooks/preferenceStore";

const Title = ({text}) => {
    const colorScheme = preferenceStore.get('colorScheme')?.stringValue ?? 'dark';
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_title(currentTheme)

    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>{text}</Text>
        </View>
    )
}

export default Title
