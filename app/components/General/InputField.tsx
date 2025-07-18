import { TextInput } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import * as React from "react";
import {useThemeContext} from "@/theme/ThemeContext";

export function InputField({ value, onChange, label, secure, placeholder, disabled } : {
    value: string;
    onChange?: (t: string) => void;
    label: string;
    secure: boolean;
    placeholder?: string;
    disabled?: boolean;

}) {
    const { currentTheme } = useThemeContext()
    const styles = styles_inputField(currentTheme)
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoCapitalize='none'
            label={label}
            secureTextEntry={secure}
            placeholder={placeholder}
            disabled={disabled}
            placeholderTextColor={currentTheme.colors.textColor}/>
    )
}

const styles_inputField = (theme: any) => StyleSheet.create({
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: theme.colors.oppositeColor,
        borderColor: theme.colors.primary,
        color: theme.colors.textColor,
        shadowColor: '#00FF00',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 12
    }
})
