import {StyleSheet} from 'react-native'

export const styles_addCategory = (theme : any) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: theme.spacing.md,
        alignItems: 'center',
    },
    statusMessage: {
        fontStyle: "italic",
        textAlign: 'center'
    },
    textView: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: theme.spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width: theme.spacing.xl,
        color: theme.colors.text
    },
    input: {
        marginVertical: 4,
        height: theme.spacing.lg,
        width: 300,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: theme.colors.oppositeColor,
        borderColor: theme.colors.primary,
        shadowColor: '#00FF00',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonView: {
        width: 225,
        height: 40,
        alignItems: 'center',
        paddingTop: 'auto',
        borderRadius: theme.radius.md,
        marginBottom: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 40,
        fontSize: 16
    },
    successMessage: {
        color: theme.colors.successColor
    },
    errorMessage: {
        color: theme.colors.failureColor
    },
    addButtonView: {
        width: '100%',
        alignItems: 'center'
    }
})
