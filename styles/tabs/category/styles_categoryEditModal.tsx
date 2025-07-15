import {StyleSheet} from 'react-native'

export const styles_categoryEditModal = (theme : any) => StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: theme.colors.textColor,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: theme.colors.background,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        color: theme.colors.textColor,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: theme.colors.failureColor,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
