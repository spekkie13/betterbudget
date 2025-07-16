import {Category} from "@/types/models";

export interface CategorySlotPickerModalProps {
    theme: any
    visible: boolean
    onClose: () => void
    selected: (Category | null)[]
    onChange: (updated: (Category | null)[]) => void
}
