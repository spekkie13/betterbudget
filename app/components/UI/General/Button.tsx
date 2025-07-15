import {StyleSheet, Pressable, Text, ViewStyle} from "react-native"
import React from "react"
import {useThemeContext} from "@/theme/ThemeContext";

interface ButtonProps {
    text: string,
    onPress?: () => void,
    color?: string,
    style?: ViewStyle,
    disabled?: boolean,
}

export default function Button({
    text,
    onPress,
    color,
    style,
    disabled,}: ButtonProps) {

    const { currentTheme } = useThemeContext()
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                {backgroundColor: disabled ? currentTheme.colors.accent : color ? color : currentTheme.colors.accent, opacity: pressed ? 0.8 : 1},
                style
            ]
            }>
            <Text style={[styles.text, {color: currentTheme.colors.textColor}]}>{text}</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
