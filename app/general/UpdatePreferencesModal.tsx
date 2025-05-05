import {Modal, View, Text, TouchableOpacity, useColorScheme} from "react-native"
import React from "react";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {styles_updatePreferencesModal} from "@/styles/styles_updatePreferencesModal";
import SubTitle from "@/app/general/SubTitle";

export const UpdatePreferencesModal = ({visible, onClose}) => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_updatePreferencesModal(currentTheme)

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose}>
                <View style={styles.modalView}>
                    <SubTitle text={'Update preferences'}/>
                    <Text style={styles.modalText}>Preferences to update...</Text>
                    <Text style={styles.modalText}>Preferences to update...</Text>
                    <Text style={styles.modalText}>Preferences to update...</Text>
                    <Text style={styles.modalText}>Preferences to update...</Text>
                    <Text style={styles.modalText}>Preferences to update...</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
