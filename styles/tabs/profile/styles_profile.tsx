import {StyleSheet} from 'react-native'
import {Padding_MEDIUM, Padding_SMALL} from "@/constants/UIConstants";

export const styles_profile = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        paddingTop: Padding_MEDIUM
    },
    messageText: {
        color: theme.colors.text,
        paddingLeft: Padding_SMALL,
    },
    text: {
        color: theme.colors.textColor,
    },
    greeting: {
        textAlign: 'center',
        fontSize: 20
    },
    subGreeting: {
        textAlign: 'center',
        fontSize: 16
    },
    touchable: {
        alignItems: "center",
        marginVertical: 20
    }
})
