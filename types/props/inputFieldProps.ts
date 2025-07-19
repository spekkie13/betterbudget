// in @/types/props.ts
export interface InputFieldProps {
    value: string;
    onChange?: (text: string) => void;
    label: string;
    secure: boolean;
    placeholder?: string;
    disabled?: boolean;
}
