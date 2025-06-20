import {StyleSheet} from "react-native";

export const styles_categorySlotPickerModal = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectView: {
        backgroundColor: theme.colors.background,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    selectText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    touchable: {
        padding: 10
    },
    flatList: {
        maxHeight: 200,
        width: '75%',
        borderWidth: 2,
        borderRadius: 2
    },
    saveButton: {
        color: 'blue',
        fontSize: 16
    },
    cancelButton: {
        color: 'red',
        fontSize: 16
    }
})
