import {Image, View} from 'react-native'
import {styles_logo} from "@/styles/general/styles_logo"
import React from "react";

export const Logo = React.memo(() => {
    return (
        <View style={styles_logo.imgView}>
            <Image
                source={require('../../../assets/images/Better_Budget_logo.png')}
                style={styles_logo.imgView}
                resizeMode="contain"
                />
        </View>
    )
})
