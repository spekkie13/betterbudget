import {StyleSheet} from 'react-native'
import {Padding_SMALL, Padding_MEDIUM} from "@/constants/UIConstants";

export const styles_profile = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Padding_MEDIUM
    },
    messageText: {
        color: theme.colors.text,
        paddingLeft: Padding_SMALL,
    },
    text: {
        color: theme.colors.textColor,
    }
})
