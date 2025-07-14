export interface IExpense {
    id: number
    description: string
    amount: number
    date: string
    userId: number
    categoryId: number
    isRecurring: boolean
}

export class Expense implements IExpense {
    id: number
    description: string
    amount: number
    date: string
    userId: number
    categoryId: number
    isRecurring: boolean

    constructor(data: IExpense) {
        this.id = data.id
        this.description = data.description
        this.amount = data.amount
        this.date = data.date
        this.userId = data.userId
        this.categoryId = data.categoryId
        this.isRecurring = data.isRecurring
    }

    static empty(): Expense {
        const expenseData = {
            id: 0,
            description: "",
            amount: 0,
            date: "",
            userId: 0,
            categoryId: 0,
            isRecurring: false
        }
        return new Expense(expenseData)
    }
}
