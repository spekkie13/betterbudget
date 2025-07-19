import {styles_title} from "@/styles/general/styles_title"
import {Text, View} from 'react-native'
import {useThemeContext} from "@/theme/ThemeContext"
import React, {useMemo} from "react";

export const Title = React.memo(({ text }: { text: string }) => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_title(currentTheme), [currentTheme])

    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>{text}</Text>
        </View>
    )
})
