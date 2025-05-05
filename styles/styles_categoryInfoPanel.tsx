import {StyleSheet} from 'react-native'
import {Padding_EXTRA_LARGE} from "@/constants/UIConstants";

export const styles_categoryInfoPanel = (theme) => StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: Padding_EXTRA_LARGE,
    },
    card: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        backgroundColor: theme.colors.background,
    },
    cardView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
