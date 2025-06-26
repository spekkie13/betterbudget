import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AuthContext} from '@/app/ctx';
import {getCategories} from '@/api/CategoryController';
import CategorySlotPicker, {Category} from './CategorySlotPicker';
import CategorySlotPickerModal from './CategorySlotPickerModal';
import CustomButton from '@/app/general/CustomButton';
import {useRouter} from "expo-router";
import {styles_profile} from "@/styles/tabs/profile/styles_profile";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {preferenceStore} from "@/hooks/preferenceStore";
import Title from "@/app/general/Title";
import SubTitle from "@/app/general/SubTitle";

const Profile = () => {
    const {user} = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<(Category | null)[]>([null, null, null, null]);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const colorScheme = preferenceStore.get('colorScheme').stringValue;
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
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
            <Title text={`Hello, ${user?.username}`}/>
            <SubTitle text={'Favorite Categories:'}/>

            {/* Manage button */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchable}>
                <CustomButton text="Manage Categories" color="blue"/>
            </TouchableOpacity>

            {/* Always render read-only slots */}
            <CategorySlotPicker selectedCategories={selectedSlots}/>

            {/* Modal for editing */}
            <CategorySlotPickerModal
                visible={modalVisible}
                user={user}
                onClose={() => setModalVisible(false)}
                categories={categories}
                selected={selectedSlots}
                onChange={(updated) => setSelectedSlots(updated)}
            />
        </View>
    );
};

export default Profile;
