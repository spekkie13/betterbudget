import {Text, Pressable} from 'react-native'

interface CustomLinkProps {
    text: string
    onPress: () => void
    style?: any
}

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
