import {Category} from "@/types/models";

export interface CategorySlotPickerProps {
    theme: any
    selectedCategories: (Category | null)[]
    onSlotPress?: (index: number) => void
}
