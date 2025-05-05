import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native"
import {styles_categoryEditModal} from "@/styles/styles_categoryEditModal"
import {useEffect, useState} from "react"
import {fetchCategories} from "@/api/CategoryController"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const CategoryEditModal = ({ visible, onClose, categoryId}) => {
    const [category, setCategory] = useState(null)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categoryEditModal(currentTheme)

    useEffect(() => {
        const fetchData = async () => {
            const cat = await fetchCategories(categoryId)
            setCategory(cat)
        }

        fetchData()
    }, [])
    return(
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Name: {category.name}</Text>
                    <Text style={styles.modalText}>Color: {category.color}</Text>
                    <Text style={styles.modalText}>Icon: {category.icon || 'N/A'}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default CategoryEditModal
