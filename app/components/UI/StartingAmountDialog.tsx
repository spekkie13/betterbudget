import {Text, Modal, TouchableOpacity, View} from "react-native"
import {InputField} from "@/app/components/General";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_startingAmountDialog} from "@/styles/styles_startingAmountDialog";
import {updateUserPreference} from "@/api";
import {preferenceStore} from "@/hooks";
import {AuthContext} from "@/app/ctx";

const StartingAmountDialog = React.memo(({ visible, onClose } : {visible: boolean, onClose: () => void}) => {
    const [startingAmount, setStartingAmount] = useState('0')
    const { userState } = useContext(AuthContext)
    const user = userState.user
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_startingAmountDialog(currentTheme), [currentTheme])

    useEffect(() => {
        const pref = preferenceStore.get('Starting Amount')
        if (pref) {
            setStartingAmount(pref.numberValue.toString())
        }
    }, [user])

    const handleSave = async () => {
        try {
            const startingAmountPref = preferenceStore.get('Starting Amount')
            const amountNumber = parseFloat(startingAmount)
            if (isNaN(amountNumber)) {
                console.warn('Ongeldige waarde:', startingAmount)
                return
            }

            await updateUserPreference(startingAmountPref.id, {
                name: 'Starting Amount',
                numberValue: amountNumber,
                userId: user.id,
            })

            // ✅ Optioneel ook meteen je lokale store bijwerken:
            const pref = preferenceStore.get('Starting Amount')
            if (pref) {
                pref.numberValue = amountNumber
            }

            onClose() // sluit de modal na opslaan
        } catch (err) {
            console.error('Opslaan mislukt:', err)
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.selectView}>
                    <Text style={styles.selectText}>Start saldo</Text>
                    <InputField
                        onChange={setStartingAmount}
                        label={'Start saldo'}
                        value={startingAmount}
                        secure={false}
                        />

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

export default StartingAmountDialog
