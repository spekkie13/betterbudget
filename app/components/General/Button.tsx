import {Pressable, Text} from "react-native"
import React, { useCallback } from "react"
import {useThemeContext} from "@/theme/ThemeContext";
import {ButtonProps} from "@/types/props"
import {styles_button} from "@/styles/general/styles_button"

// Na
export function Button({text, onPress, color, style, disabled}: ButtonProps) {
    const { currentTheme } = useThemeContext()

    const handlePress = useCallback(() => {
        if (!disabled && onPress) {
            onPress()
        }
    }, [disabled, onPress])

    const buttonStyle = useCallback(({ pressed }: { pressed: boolean }) => [
        styles_button.button,
        {
            backgroundColor: disabled ? currentTheme.colors.accent : color ? color : currentTheme.colors.accent,
            opacity: pressed ? 0.8 : 1
        },
        style
    ], [disabled, color, currentTheme.colors.accent, style])

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            style={buttonStyle}>
            <Text style={[styles_button.text, {color: currentTheme.colors.textColor}]}>{text}</Text>
        </Pressable>
    )
}
