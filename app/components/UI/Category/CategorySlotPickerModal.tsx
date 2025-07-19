import React, {useContext, useMemo, useState} from 'react'
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native'
import CategorySlotPicker from './CategorySlotPicker'
import {saveCategorySlots} from "@/api"
import {styles_categorySlotPickerModal} from "@/styles/tabs/profile/styles_categorySlotPickerModal"
import {useCategories} from "@/hooks"
import {AuthContext} from "@/app/ctx"
import { CategorySlotPickerModalProps } from "@/types/props"
import {Category} from "@/types/models"

const CategorySlotPickerModal: React.FC<CategorySlotPickerModalProps> = React.memo(({theme, visible, onClose, selected, onChange} : CategorySlotPickerModalProps) => {
    const [localSelected, setLocalSelected] = useState<(Category | null)[]>(selected)
    const [activeSlot, setActiveSlot] = useState<number | null>(null)

    const styles = useMemo(() => styles_categorySlotPickerModal(theme), [theme])

    const { userState } = useContext(AuthContext)
    const { categoriesState } = useCategories({userId: userState.user.id})

    const handleSlotPress = (index: number) => {
        setActiveSlot(index)
    }

    const handleCategorySelect = (category: Category) => {
        if (activeSlot !== null) {
            const updated = [...localSelected]
            updated[activeSlot] = category
            setLocalSelected(updated)
        }
    }

    const handleSave = async () => {
        await saveCategorySlots(localSelected)
        onChange(localSelected)
        onClose()
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.selectView}>
                    <Text style={styles.selectText}>Select Categories</Text>

                    <CategorySlotPicker
                        theme={theme}
                        selectedCategories={localSelected}
                        onSlotPress={handleSlotPress}
                    />

                    {activeSlot !== null && (
                        <>
                            <Text style={styles.selectText}>Pick Category for Slot {activeSlot + 1}:</Text>
                            <FlatList
                                data={categoriesState.categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => handleCategorySelect(item)}
                                        style={styles.touchable}
                                    >
                                        <Text style={styles.text}>{item.name}</Text>
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
    )
})

export default CategorySlotPickerModal
