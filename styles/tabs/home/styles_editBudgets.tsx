import {StyleSheet} from 'react-native'

export const styles_editBudgets = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        flex: 1,
        padding: 16,
        width: '100%',
        alignItems: 'center'
    },
    categoryPanel: {
        marginTop: 5
    }
})
