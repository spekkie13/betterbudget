import {StyleSheet} from 'react-native'

export const styles_title = (theme : any) => StyleSheet.create({
    title: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 5,
    },
    titleText: {
        fontSize: 32,
        color: theme.colors.titleColor,
        fontFamily: 'Manrope-Bold',
        fontWeight: 'bold',
    },
})
