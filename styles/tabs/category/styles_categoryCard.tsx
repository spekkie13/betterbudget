import {StyleSheet} from 'react-native'

export const styles_categoryCard = (theme : any) => StyleSheet.create({
    categoryCard: {
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary
    },
    container: {
        width: '100%',
        marginTop: 5,
    },
    categoryName: {
        fontWeight: 'bold',
        fontFamily: 'Manrope-Bold',
        color: theme.colors.textColor
    },
    spent: {
        fontStyle: 'italic',
        fontFamily: 'Manrope-Bold',
        color: theme.colors.textColor,
        paddingBottom: 5
    },
    status: {
        color: theme.colors.textColor,
        fontFamily: 'Manrope-Bold',

    },
    errorText: {
        color: theme.colors.textColor
    },
})
