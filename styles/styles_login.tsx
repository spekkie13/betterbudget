import {StyleSheet} from 'react-native'

export const styles_login = (theme) => StyleSheet.create({
    safeContainer: {
        backgroundColor: theme.colors.background,
        alignItems: "center",
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
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: theme.colors.oppositeColor,
        borderColor: theme.colors.primary,
        color: theme.colors.textColor,
        shadowColor: '#00FF00',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
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
        backgroundColor: theme.colors.secondary,
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
        fontStyle: 'italic'
    }
})
