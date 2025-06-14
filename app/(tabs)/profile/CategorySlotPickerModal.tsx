import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import CategorySlotPicker, { Category } from './CategorySlotPicker';
import {saveCategorySlots} from "@/api/PreferenceController";
import {User} from "@/models/user";

interface Props {
    visible: boolean;
    user: User;
    onClose: () => void;
    categories: Category[];
    selected: (Category | null)[];
    onChange: (updated: (Category | null)[]) => void;
}

const CategorySlotPickerModal: React.FC<Props> = ({ visible, user, onClose, categories, selected, onChange }) => {
    const [localSelected, setLocalSelected] = useState<(Category | null)[]>(selected);
    const [activeSlot, setActiveSlot] = useState<number | null>(null);

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
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, maxHeight: '90%', width: '25%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Select Categories</Text>

                    <CategorySlotPicker
                        selectedCategories={localSelected}
                        onSlotPress={handleSlotPress}
                    />

                    {activeSlot !== null && (
                        <>
                            <Text style={{ fontSize: 16, marginVertical: 10 }}>Pick Category for Slot {activeSlot + 1}:</Text>
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleCategorySelect(item)}
                                        style={{ padding: 10 }}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                style={{ maxHeight: 200, width: '75%', borderWidth: 2, borderRadius: 2 }}
                            />
                        </>
                    )}

                    <TouchableOpacity onPress={handleSave} style={{ marginTop: 20 }}>
                        <Text style={{ color: 'blue', fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CategorySlotPickerModal;
