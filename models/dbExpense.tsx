export class dbExpense implements IdbExpense{
    id: number
    date: Date
    amount: number
    description: string
    categoryId: number
    isRecurring: boolean
    userId: number

    constructor(
        data: IdbExpense
    ) {
        this.id = data.id
        this.date = data.date
        this.amount = data.amount
        this.description = data.description
        this.categoryId = data.categoryId
        this.isRecurring = data.isRecurring
        this.userId = data.userId
    }
}

interface IdbExpense {
    id: number,
    date: Date,
    amount: number,
    description: string,
    categoryId: number,
    isRecurring: boolean,
    userId: number
}
