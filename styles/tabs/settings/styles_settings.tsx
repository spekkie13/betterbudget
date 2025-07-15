import {StyleSheet} from 'react-native'

export const styles_settings = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.md,
        alignItems: 'center'
    },
    logoutView: {
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        flexDirection: 'row'
    },
    text: {
        textAlign: 'right',
        alignSelf: 'stretch',
        width: 150,
        paddingRight: theme.spacing.md,
        color: theme.colors.textColor
    },
    picker: {
        marginTop: 2,
        marginLeft: 5,
        width: 165,
        color: theme.colors.textColor,
        backgroundColor: theme.colors.background
    },
    button: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    signOutButton: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
        color: theme.colors.failureColor,
    },
})

export const pickerStyles = (theme: any) => StyleSheet.create({
    inputIOS: {
        width: 200,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.oppositeColor,
        borderRadius: 4,
        color: theme.colors.primary,
        textAlign: 'center',
    },
    inputAndroid: {
        width: 200,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        backgroundColor: theme.colors.oppositeColor,
        textAlign: 'center',
        marginBottom: 5,
    }
})
