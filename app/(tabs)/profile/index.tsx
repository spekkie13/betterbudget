import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AuthContext} from '@/app/ctx';
import {getCategories} from '@/api/CategoryController';
import CategorySlotPicker, {Category} from '../../components/CategorySlotPicker';
import CategorySlotPickerModal from '../../components/CategorySlotPickerModal';
import CustomButton from '@/app/components/UI/CustomButton';
import {useRouter} from "expo-router";
import {styles_profile} from "@/styles/tabs/profile/styles_profile";
import Title from "@/app/components/Text/Title";
import SubTitle from "@/app/components/Text/SubTitle";
import {useThemeContext} from "@/theme/ThemeContext";

const Profile = () => {
    const {user} = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<(Category | null)[]>([null, null, null, null]);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const { currentTheme } = useThemeContext();
    const styles = styles_profile(currentTheme)

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const result = await getCategories(user?.id);
                setCategories(result);
            } else {
                router.replace('/')
                return;
            }
        }

        fetchData()
    }, [router, user])

    return (
        <View style={styles.container}>
            <Title text={`Hello ${user?.username}`}/>
            <SubTitle text={'Favorite Categories:'}/>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchable}>
                <CustomButton text="Manage Categories" color="blue" textColor='#ffffff'/>
            </TouchableOpacity>

            <CategorySlotPicker selectedCategories={selectedSlots} theme={currentTheme}/>

            <CategorySlotPickerModal
                theme={currentTheme}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                categories={categories}
                selected={selectedSlots}
                onChange={(updated) => setSelectedSlots(updated)}
            />
        </View>
    );
};

export default Profile;
