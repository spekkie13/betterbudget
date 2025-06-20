import React, {useState} from 'react';
import {FlatList, Modal, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import CategorySlotPicker, {Category} from './CategorySlotPicker';
import {saveCategorySlots} from "@/api/PreferenceController";
import {User} from "@/models/user";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_categorySlotPickerModal} from "@/styles/tabs/profile/styles_categorySlotPickerModal";

interface Props {
    visible: boolean;
    user: User;
    onClose: () => void;
    categories: Category[];
    selected: (Category | null)[];
    onChange: (updated: (Category | null)[]) => void;
}

const CategorySlotPickerModal: React.FC<Props> = ({visible, user, onClose, categories, selected, onChange}) => {
    const [localSelected, setLocalSelected] = useState<(Category | null)[]>(selected);
    const [activeSlot, setActiveSlot] = useState<number | null>(null);
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_categorySlotPickerModal(theme);

    const handleSlotPress = (index: number) => {
        setActiveSlot(index);
    };

    const handleCategorySelect = (category: Category) => {
        if (activeSlot !== null) {
            const updated = [...localSelected];
            updated[activeSlot] = category;
            setLocalSelected(updated);
        }
    };

    const handleSave = async () => {
        await saveCategorySlots(user.id, localSelected);
        onChange(localSelected);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.selectView}>
                    <Text style={styles.selectText}>Select Categories</Text>

                    <CategorySlotPicker
                        selectedCategories={localSelected}
                        onSlotPress={handleSlotPress}
                    />

                    {activeSlot !== null && (
                        <>
                            <Text style={styles.selectText}>Pick Category for Slot {activeSlot + 1}:</Text>
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => handleCategorySelect(item)}
                                        style={styles.touchable}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                style={styles.flatList}
                            />
                        </>
                    )}

                    <TouchableOpacity onPress={handleSave} style={styles.touchable}>
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={styles.touchable}>
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CategorySlotPickerModal;
