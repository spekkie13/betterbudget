import {StyleSheet} from 'react-native'

export const styles_about = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    logoutView: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        width: 125,
        alignSelf: 'center',
        color: theme.colors.textColor
    },
    picker: {
        marginTop: 2,
        marginLeft: 5,
        width: 165,
        color: theme.colors.textColor,
        backgroundColor: theme.colors.background
    },
    updateButton: {
        marginTop: 10,
        marginLeft: 125,
        width: 175,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
