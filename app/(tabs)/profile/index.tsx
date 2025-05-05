import {Text, TouchableOpacity, useColorScheme, View} from "react-native"
import { AuthContext } from '@/app/ctx'
import {useContext, useState} from "react"
import Title from "@/app/general/Title"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {UpdatePreferencesModal} from "@/app/general/UpdatePreferencesModal"
import {styles_profile} from "@/styles/styles_profile"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import {Link} from "expo-router";
import CustomButton from "@/app/general/CustomButton";

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_profile(currentTheme)

    return(
        <View style={styles.container}>
            <Title text={'Profile'}/>
            <Text style={styles.text}>Hello, {user.name}</Text>
            <TouchableOpacity onPress={() => setUpdateModalVisible(true)}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome name={'cog'} size={24} color={currentTheme.colors.primary}/>
                    <Text style={styles.messageText}>Update Preferences</Text>
                </View>
            </TouchableOpacity>
            <UpdatePreferencesModal
                onClose={() => {
                    setUpdateModalVisible(false)
                }}
                visible={updateModalVisible}/>
            <View style={{marginTop: 10}}>
                <Link style={{marginBottom: 5}} href='/(tabs)/profile/ManageCategories'>
                    <CustomButton text="Manage Categories" color="blue"/>
                </Link>
                <Link style={{marginTop: 5}} href='/(tabs)/profile/ManageBudgets'>
                    <CustomButton text="Manage Budgets" color="blue"/>
                </Link>
            </View>
        </View>
    )
}

export default Profile
