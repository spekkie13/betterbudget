import {StyleSheet} from "react-native"
import {Padding_MEDIUM} from "@/constants/UIConstants";

export const styles_addCategory = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: Padding_MEDIUM,
        alignItems: "center",
    },
    statusMessage: {
        fontStyle: "italic",
        textAlign: 'center'
    },
    textView: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width: 100,
        color: theme.colors.text
    },
    input: {
        marginVertical: 4,
        height: 50,
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
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        paddingTop: 'auto',
        borderRadius: 25,
        marginBottom: 5,
    },
    buttonText: {
        color: theme.colors.textColor,
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
        width: "100%",
        alignItems: "center"
    }
})
