import {StyleSheet} from 'react-native'

export const styles_categoryDetails = (theme : any) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: theme.spacing.md,
        paddingLeft: 10,
        alignItems: 'center',
    },
    titleText: {
        paddingTop: 15,
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.text
    },
    categoryList: {
        paddingBottom: theme.spacing.lg
    },
    expenseItemView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing.xs
    },
    expenseItemText: {
        color: theme.colors.textColor,
        lineHeight: 25
    },
    backButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
    },
    errorMessage: {
        color: theme.colors.failureColor
    },
    touchable: {
        paddingTop: theme.spacing.xs
    }
})
