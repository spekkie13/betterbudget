import {StyleSheet} from 'react-native'

export const styles_categorySlotPickerModal = (theme : any) => StyleSheet.create({
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
        color: theme.colors.textColor,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        color: theme.colors.textColor,
    },
    touchable: {
        padding: 10
    },
    flatList: {
        borderColor: theme.colors.primary,
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
