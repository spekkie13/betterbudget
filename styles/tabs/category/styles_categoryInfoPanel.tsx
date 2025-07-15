import {StyleSheet} from 'react-native'

export const styles_categoryInfoPanel = (theme : any) => StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing.xl,
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
    },
    errorText: {
        color: theme.colors.error,
    },
    categoryView: {
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 5
    },
    notFoundText: {
        color: '#ccc',
        marginTop: 10
    }
})
