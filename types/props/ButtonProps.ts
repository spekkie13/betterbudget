import {ViewStyle} from "react-native";

export interface ButtonProps {
    text: string,
    onPress?: () => void,
    color?: string,
    style?: ViewStyle,
    disabled?: boolean,
}
