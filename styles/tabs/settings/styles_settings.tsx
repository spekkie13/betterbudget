import {StyleSheet} from 'react-native'
import {Padding_MEDIUM} from "@/constants/UIConstants";

export const styles_settings = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Padding_MEDIUM,
        alignItems: 'center'
    },
    logoutView: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        flexDirection: 'row'
    },
    text: {
        alignSelf: 'center',
        textAlign: 'right',
        paddingRight: Padding_MEDIUM,
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
        width: 175,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export const pickerStyles = (theme: any) => StyleSheet.create({
    inputIOS: {
        width: 200,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.oppositeColor,
        borderRadius: 4,
        color: theme.colors.primary,
        textAlign: 'center',
    },
    inputAndroid: {
        width: 200,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        backgroundColor: theme.colors.oppositeColor,
        textAlign: 'center',
        marginBottom: 5,
    }
})
