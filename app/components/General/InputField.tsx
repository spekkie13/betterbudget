import { TextInput } from 'react-native-paper'
import * as React from "react";
import {useThemeContext} from "@/theme/ThemeContext";
import {useCallback, useMemo, useRef} from "react";
import {styles_inputField} from "@/styles/general/styles_inputField";
import {InputFieldProps} from "@/types/props";
import {View} from "react-native";


// Constants for styling
const INPUT_STYLE_CONFIG = {
    VERTICAL_MARGIN: 4,
    HEIGHT: 50,
    BORDER_RADIUS: 4,
    SHADOW_OPACITY: 0.9,
    SHADOW_RADIUS: 10,
    BOTTOM_MARGIN: 12,
} as const;

const useInputStyles = (disabled: boolean = false) => {
    const {currentTheme} = useThemeContext();

    return useMemo(() => {
        const styleConfig = {
            backgroundColor: disabled
                ? currentTheme.colors.accentMuted
                : currentTheme.colors.oppositeColor,
            color: currentTheme.colors.textColor,
            placeholderColor: currentTheme.colors.textColor
        };

        const baseStyles = styles_inputField(currentTheme);

        return {
            computedStyles: {
                ...baseStyles.input,
                backgroundColor: styleConfig.backgroundColor,
                height: INPUT_STYLE_CONFIG.HEIGHT,
                borderRadius: INPUT_STYLE_CONFIG.BORDER_RADIUS,
                marginVertical: INPUT_STYLE_CONFIG.VERTICAL_MARGIN,
                marginBottom: INPUT_STYLE_CONFIG.BOTTOM_MARGIN,
            },
            styleConfig
        };
    }, [disabled, currentTheme]);
};

export const InputField = React.memo(({
                                          value,
                                          onChange,
                                          label,
                                          secure,
                                          placeholder,
                                          disabled = false,
                                          testID
                                      }: InputFieldProps & { testID?: string }) => {
    const inputRef = useRef<any>(null);
    const {computedStyles, styleConfig} = useInputStyles(disabled);

    const handleChangeText = useCallback((text: string) => {
        onChange?.(text);
    }, [onChange]);

    return (
        <View>
            <TextInput
                ref={inputRef}
                style={computedStyles}
                value={value}
                onChangeText={handleChangeText}  // Dit was onChange, moet handleChangeText zijn
                autoCapitalize="none"
                label={label}
                secureTextEntry={secure}
                placeholder={placeholder}
                disabled={disabled}
                placeholderTextColor={styleConfig.placeholderColor}
                testID={testID}
                accessibilityLabel={label}
            />
        </View>
    );
});

// Add display name for better debugging
InputField.displayName = 'InputField';
