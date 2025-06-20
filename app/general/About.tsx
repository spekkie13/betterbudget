import {Text, useColorScheme, View} from 'react-native'
import Title from "@/app/general/Title"
import Logo from "@/app/general/Logo"
import React from "react"
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_about} from "@/styles/general/styles_about";

const About = () => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_about(currentTheme)

    return (
        <View style={styles.container}>
            <Title text={'About'}/>
            <Logo/>
            <Text style={styles.text}>About Page</Text>
        </View>
    )
}

export default About
