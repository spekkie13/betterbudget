import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native"
import {styles_expenseDetailModal} from "@/styles/styles_expenseDetailModal"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"

const ExpenseDetailModal = ({ visible, onClose, data, valuta, }) => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_expenseDetailModal(currentTheme)

    return(
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Date: {data.date.day}-{data.date.month}-{data.date.year}</Text>
                    <Text style={styles.modalText}>Amount: {valuta}{data.amount.toFixed(2)}</Text>
                    <Text style={styles.modalText}>Description: {data.description}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ExpenseDetailModal
