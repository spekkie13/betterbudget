import {StyleSheet} from 'react-native'

export const styles_subtitle = (theme) => StyleSheet.create({
    subTitle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.background,
    },
    subTitleText: {
        fontSize: 16,
        color: theme.colors.textColor,
        fontFamily: 'Manrope-Bold',
        fontWeight: 'bold',
    },
})
