import {Image, View} from 'react-native'
import {styles_logo} from "@/styles/styles_logo"

const Logo = () => {
    return (
        <View style={styles_logo.imgView}>
            <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                   style={styles_logo.img}
            />
        </View>
    )
}

export default Logo
