import React, {useEffect, useMemo, useState} from "react"
import {Modal, Text, TouchableOpacity, View} from "react-native"
import {styles_categoryEditModal} from "@/styles/tabs/category/styles_categoryEditModal"
import {getCategories} from "@/api"
import {useThemeContext} from "@/theme/ThemeContext"
import {CategoryProps} from "@/types/props/CategoryProps";

const CategoryEditModal = React.memo(({visible, onClose, categoryId}: CategoryProps) => {
    const [category, setCategory] = useState(null)

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryEditModal(currentTheme), [currentTheme])

    useEffect(() => {
        const fetchData = async () => {
            if (!visible || !categoryId) return

            const cat = await getCategories(categoryId)
            setCategory(cat)
        }

        fetchData()
    }, [visible,  categoryId])

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
    )
})

export default CategoryEditModal
