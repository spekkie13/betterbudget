import {StyleSheet} from 'react-native'

export const styles_expenseDetailModal = (theme : any) => StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.background,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: theme.colors.textColor,
    },
    closeButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: theme.colors.background,
        color: theme.colors.textColor,
        shadowColor: theme.colors.backgroundDark
    },
})
