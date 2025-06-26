import {StyleSheet} from 'react-native'
import {Padding_LARGE} from "@/constants/UIConstants";

export const styles_AddNew = (theme) => StyleSheet.create({
    container: {
        paddingTop: Padding_LARGE,
        alignItems: "center",
        backgroundColor: theme.colors.background,
        flex: 1
    },
    addItems: {
        marginLeft: 5,
        marginRight: 5,
    },
    itemView: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        height: 200,
        borderWidth: 1,
        padding: Padding_LARGE,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary
    },
    item: {
        marginLeft: 5,
        fontSize: 32,
        color: theme.colors.textColor
    },
    touchable: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})
