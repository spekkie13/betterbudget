import React, {useContext, useState} from 'react'
import {View} from 'react-native'
import { Title, Button, SubTitle } from '@/app/components/General'
import {AuthContext} from '@/app/ctx'
import CategorySlotPicker from '../../components/UI/Category/CategorySlotPicker'
import CategorySlotPickerModal from '../../components/UI/Category/CategorySlotPickerModal'
import {styles_profile} from "@/styles/tabs/profile/styles_profile"
import {useThemeContext} from "@/theme/ThemeContext"
import {Category} from "@/types/models";

const Profile = () => {
    const {user} = useContext(AuthContext)
    const [selectedSlots, setSelectedSlots] = useState<(Category | null)[]>([null, null, null, null])
    const [modalVisible, setModalVisible] = useState(false)
    const { currentTheme } = useThemeContext()
    const styles = styles_profile(currentTheme)

    return (
        <View style={styles.container}>
            <Title text={`Hello ${user?.username}`}/>
            <SubTitle text={'Favorite Categories:'}/>

            <View style={styles.buttonView}>
                <Button
                    text='Manage Categories'
                    onPress={() => setModalVisible(true)}
                    style={styles.touchable}
                />
            </View>

            <CategorySlotPicker selectedCategories={selectedSlots} theme={currentTheme}/>

            <CategorySlotPickerModal
                theme={currentTheme}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                selected={selectedSlots}
                onChange={(updated) => setSelectedSlots(updated)}
            />
        </View>
    )
}

export default Profile
