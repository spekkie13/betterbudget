import {StyleSheet} from "react-native"

export const styles_tabLayout = (theme) => StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
        height: 50,
    },
    expenseView: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    }
})
