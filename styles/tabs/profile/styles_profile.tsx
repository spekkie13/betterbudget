import {StyleSheet} from 'react-native'

export const styles_profile = (theme : any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        paddingTop: theme.spacing.md
    },
    messageText: {
        color: theme.colors.text,
        paddingLeft: theme.spacing.sm,
    },
    text: {
        color: theme.colors.textColor,
    },
    touchable: {
        alignItems: 'center',
        marginVertical: 20
    }
})
