import {Text, Pressable} from 'react-native'
import {CustomLinkProps} from "@/types/props";

export function CustomLink({text, onPress, style, accessibilityLabel}: CustomLinkProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || text}
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1}
            ]}>
            <Text style={style}>
                {text}
            </Text>
        </Pressable>
    )
}
