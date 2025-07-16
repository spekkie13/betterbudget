import {Expense} from "@/types/models";

export type ExpenseDetailModalProps = {
    visible: boolean
    onClose: () => void
    data: Expense
    valuta: string
}
