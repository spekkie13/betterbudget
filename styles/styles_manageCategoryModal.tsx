import {StyleSheet} from "react-native";

export const styles_manageCategoryModal = (theme) => StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: theme.colors.background,
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    closeButton: {
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors.text,
        textAlign: "center",
    },
    itemButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: theme.colors.secondary,
        borderRadius: 5,
    },
    modalText: {
        textAlign: 'center',
        color: theme.colors.textColor,
    },
});
