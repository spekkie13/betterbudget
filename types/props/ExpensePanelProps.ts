import {Category, Expense} from "@/types/models";

export interface ExpensePanelProps {
    expenses?: Expense[]
    category?: Category
    groupedDates?: any
    categoryId?: string
}
