import {StyleSheet} from 'react-native'
import {Padding_MEDIUM} from "@/constants/UIConstants";

export const styles_home = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: Padding_MEDIUM
    },
    header: {
        alignItems: 'center',
        marginVertical: 'auto'
    },
    headerView: {
        borderWidth: 1,
        borderStyle: 'solid',
        width: 300,
        borderColor: theme.colors.primary,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: theme.colors.backgroundDark
    },
    headerText: {
        color: theme.colors.textColor,
        paddingTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    spendingRoomText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    body: {
        alignItems: 'center',
        width: '100%'
    },
    categoryPanel: {
        marginTop: 5
    }
})
