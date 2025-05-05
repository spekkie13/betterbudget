import {StyleSheet} from 'react-native'
import {Padding_LARGE} from "@/constants/UIConstants";

export const styles_AddNew = (theme) => StyleSheet.create({
    container: {
        paddingTop: Padding_LARGE,
        backgroundColor: theme.colors.background,
        flex: 1
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
        borderColor: theme.colors.primary
    },
    item: {
        marginLeft: 5,
        fontSize: 32,
        color: theme.colors.textColor
    }
})
