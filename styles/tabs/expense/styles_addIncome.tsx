import {StyleSheet} from "react-native";

export const styles_addIncome = (theme : any) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.md,
        flex: 1,
        alignItems: 'center',
    },
    view: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
    },
    text: {
        width: 100,
        verticalAlign: 'middle',
        color: theme.colors.textColor
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
        width: 300,
    },
    buttonView: {
        width: 225,
        height: 40,
        alignItems: 'center',
        paddingTop: 'auto',
        borderRadius: 25,
        marginBottom: 5,
    },
    successText: {
        color: theme.colors.successColor
    },
    failureText: {
        color: theme.colors.failureColor
    },
    addView: {
        alignItems: 'center'
    },
    backButtonView: {
        paddingBottom: 5
    }
})
