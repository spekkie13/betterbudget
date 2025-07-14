export interface IBudget {
    id: number
    amount: number
    userId: number
    categoryId: number
    periodId: number
}

export class Budget implements IBudget {
    id: number
    amount: number
    userId: number
    categoryId: number
    periodId: number

    constructor(data: IBudget) {
        this.id = data.id
        this.amount = data.amount
        this.userId = data.userId
        this.categoryId = data.categoryId
        this.periodId = data.periodId
    }

    static empty(): Budget {
        const budgetData = {
            id: 0,
            amount: 0,
            userId: 0,
            categoryId: 0,
            periodId: 0,
        }

        return new Budget(budgetData)
    }
}
