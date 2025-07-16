import {Category, Expense, Period} from "@/types/models";

export type UpdateCategoryProps = {
    category: Category
    expenses: Expense[]
    period: Period
}
