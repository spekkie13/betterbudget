import React, {useEffect, useState} from "react";
import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles_categoryEditModal} from "@/styles/tabs/category/styles_categoryEditModal";
import {getCategories} from "@/api/CategoryController";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

const CategoryEditModal = ({visible, onClose, categoryId}) => {
    const [category, setCategory] = useState(null);

    const colorScheme = useColorScheme();
    const currentTheme =
        colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categoryEditModal(currentTheme);

    useEffect(() => {
        const fetchData = async () => {
            if (!visible || !categoryId) return;

            const cat = await getCategories(categoryId);
            setCategory(cat);
        }

        fetchData();
    }, [visible,  categoryId]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.backdrop}
                onPress={onClose}
                activeOpacity={1}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Name: {category?.name || 'N/A'}</Text>
                    <Text style={styles.modalText}>Color: {category?.color || 'N/A'}</Text>
                    <Text style={styles.modalText}>Icon: {category?.icon || 'N/A'}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default CategoryEditModal;
