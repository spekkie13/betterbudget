import {Text, Pressable} from 'react-native'
import {CustomLinkProps} from "@/types/props";

export function CustomLink({text, onPress, style}: CustomLinkProps) {
    return (
        <Pressable
            onPress={onPress}>
            <Text style={style}>
                {text}
            </Text>
        </Pressable>
    )
}
