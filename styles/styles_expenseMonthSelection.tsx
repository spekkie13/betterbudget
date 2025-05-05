import {StyleSheet} from "react-native"
import {Padding_LARGE, Padding_SMALL} from "@/constants/UIConstants"

export const styles_expenseMonthSelection = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        padding: 20,
        flex: 1
    },
    scrollView: {
        paddingBottom: Padding_LARGE
    },
    dateItem: {
        padding: 10,
        backgroundColor: theme.colors.background,
        marginBottom: 10,
        color: theme.colors.text,
    },
    touchable: {
        marginRight: 20
    },
    headerText: {
        color: theme.colors.text,
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: Padding_SMALL
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
    view: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 8,
        color: theme.colors.textColor
    },
    text: {
        fontSize: 20,
        lineHeight: 20,
        textAlign: 'left',
        color: theme.colors.text,
    }
})
