import {StyleSheet} from 'react-native'

export const styles_login = (theme) => StyleSheet.create({
    safeContainer: {
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1
    },
    activityIndicator: {
        margin: 28
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    button: {
        marginVertical: 4,
        width: 225,
        color: theme.colors.primary
    },
    loading: {
        margin: 28
    },
    buttonView: {
        width: '100%',
        alignItems: 'center'
    },
    messageView: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.borderColor,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.background,
    },
    signInText: {
        color: theme.colors.textColor,
        fontSize: 24,
        textAlign: 'center'
    },
    submissionText: {
        color: theme.colors.failureColor,
        textAlign: 'center'
    },
    signInButtonView: {
        marginTop: theme.spacing.sm,
        width: '100%',
        alignItems: 'center',
    },
    signUpView: {
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        height: 40
    },
    signUpText: {
        color: theme.colors.textColor,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: theme.colors.accentMuted,
    }
})
