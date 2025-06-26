import {StyleSheet} from "react-native";

export const styles_categorySlotPicker = (theme) => StyleSheet.create({
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    touchable: {
        borderWidth: 2,
        width: 160,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.secondary,
    },
    emptyCard: {
        fontSize: 24,
        color: theme.colors.textColor,
    }
})
