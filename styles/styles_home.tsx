import {StyleSheet} from 'react-native'

export const styles_home = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.md,
        flex: 1
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
        backgroundColor: 'gray'
    },
    headerText: {
        color: theme.colors.textColor,
        paddingTop: 10,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        fontWeight: 'bold',

    },
    spendingRoomText: {
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        fontWeight: 'bold',
    },
    body: {
        alignItems: 'center',
        width: '100%'
    },
    categoryPanel: {
        marginTop: 5
    },
    text: {
        width: theme.spacing.xl,
        color: theme.colors.text
    },
})
