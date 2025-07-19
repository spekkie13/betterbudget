import {styles_subtitle} from "@/styles/general/styles_subtitle"
import {Text, View} from 'react-native'
import {useThemeContext} from "@/theme/ThemeContext"
import React, {useMemo} from "react";

export const SubTitle = React.memo(({text} : {text : string}) => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_subtitle(currentTheme), [currentTheme])

    return (
        <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>{text}</Text>
        </View>
    )
})
