import {StyleSheet} from 'react-native'

export const styles_AddNew = (theme : any) => StyleSheet.create({
    container: {
        paddingTop: theme.spacing.lg,
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        flex: 1
    },
    addItems: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
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
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary
    },
    item: {
        marginLeft: 5,
        fontSize: 32,
        color: theme.colors.textColor,
        fontFamily: 'Manrope-Bold',
    },
    touchable: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})
