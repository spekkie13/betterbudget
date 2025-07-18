import {StyleProp, TextStyle} from "react-native";

export interface CustomLinkProps {
    text: string
    onPress: () => void
    style?: StyleProp<TextStyle>
    accessibilityLabel?: string
}
