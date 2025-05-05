import { StyleSheet } from 'react-native'

export const styles_CategoryManagement = (theme) => StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    itemBlock: {
        width: '48%',
        marginBottom: 10
    },
    touchable: {
        width: '100%',
    },
    menuItem: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        backgroundColor: theme.colors.background,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        color: theme.colors.textColor,
        marginLeft: 8,
    }
})
