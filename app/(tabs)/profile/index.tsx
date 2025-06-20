import React, { useState, useEffect, useContext } from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import { AuthContext } from '@/app/ctx';
import { getCategories } from '@/api/CategoryController';
import CategorySlotPicker, { Category } from './CategorySlotPicker';
import CategorySlotPickerModal from './CategorySlotPickerModal';
import CustomButton from '@/app/general/CustomButton';
import {useRouter} from "expo-router";
import {styles_profile} from "@/styles/styles_profile";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<(Category | null)[]>([null, null, null, null]);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_profile(currentTheme)

    useEffect(() => {
        if (user){
            const fetchData = async () => {
                const result = await getCategories(user?.id);
                setCategories(result);
            };
            fetchData();
        }else {
            router.replace('/')
            return;
        }
    }, [router,  user]);

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hello {user?.username}</Text>
            <Text style={styles.subGreeting}>Favorite Categories:</Text>
            {/* Manage button */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchable}>
                <CustomButton text="Manage Categories" color="blue" />
            </TouchableOpacity>

            {/* Always render read-only slots */}
            <CategorySlotPicker selectedCategories={selectedSlots} />

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
