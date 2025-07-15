import {StyleSheet} from 'react-native'

export const styles_categoryOverview = (theme : any) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing.md,
        paddingTop: theme.spacing.md,
        flex: 1
    },
    scrollContainer: {
        paddingBottom: theme.spacing.lg
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 24,
    },
    body: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        backgroundColor: theme.colors.background
    },
    cardView: {
        marginRight: 5
    },
    buttonView: {
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        color: theme.colors.text,
        marginTop: 10
    }
})
