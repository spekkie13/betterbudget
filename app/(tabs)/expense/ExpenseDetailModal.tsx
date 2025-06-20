import React from "react";
import {Modal, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles_expenseDetailModal} from "@/styles/tabs/expense/styles_expenseDetailModal";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {Expense} from "@/models/expense";

type Props = {
    visible: boolean;
    onClose: () => void;
    data: Expense;
    valuta: string;
};

const ExpenseDetailModal: React.FC<Props> = ({visible, onClose, data, valuta}) => {
    const colorScheme = useColorScheme();
    const currentTheme =
        colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_expenseDetailModal(currentTheme);

    const formattedDate = data?.date
        ? new Date(data.date).toLocaleDateString()
        : "Unknown date";

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Date: {formattedDate}</Text>
                    <Text style={styles.modalText}>
                        Amount: {valuta}
                        {data?.amount?.toFixed(2)}
                    </Text>
                    <Text style={styles.modalText}>
                        Description: {data?.description || "No description"}
                    </Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ExpenseDetailModal;
