import {Modal, Text, useColorScheme, View, FlatList, TouchableOpacity} from "react-native";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_manageCategoryModal} from "@/styles/styles_manageCategoryModal";

const ManageCategoryModal = ({ visible, onClose, items, onSelect }) => {
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_manageCategoryModal(currentTheme);

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
                <View style={styles.modalView}>
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => {
                                    onSelect(item); // Call the selection handler with the selected item
                                    onClose(); // Close the modal
                                }}
                            >
                                <Text style={styles.modalText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ManageCategoryModal;
