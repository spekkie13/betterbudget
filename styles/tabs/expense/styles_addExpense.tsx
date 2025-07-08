import {StyleSheet} from "react-native"
import {Padding_MEDIUM} from "@/constants/UIConstants"

export const pickerSelectStyles = (currentTheme) => StyleSheet.create({
    inputIOS: {
        width: 300,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: currentTheme.colors.primary,
        borderRadius: 4,
        color: currentTheme.colors.primary,
        textAlign: 'center',
    },
    inputAndroid: {
        width: 300,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: currentTheme.colors.primary,
        borderRadius: 8,
        color: 'white',
        backgroundColor: currentTheme.colors.oppositeColor,
        textAlign: 'center',
        marginBottom: 5,
    }
})

export const styles_AddExpense = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: Padding_MEDIUM,
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
        backgroundColor: theme.colors.primary,
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
    addButtonView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButtonView: {
        paddingBottom: 5
    }
})
