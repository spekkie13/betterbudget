import {StyleSheet} from 'react-native'

export const styles_categoryCard = (theme) => StyleSheet.create({
    categoryCard: {
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        width: 185,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary
    },
    container: {
        marginTop: 5,
    },
    categoryName: {
        fontWeight:'bold',
        color: theme.colors.textColor
    },
    spent: {
        fontStyle: 'italic',
        color: theme.colors.textColor,
        paddingBottom: 5
    },
    status: {
        color: theme.colors.textColor
    }
})
