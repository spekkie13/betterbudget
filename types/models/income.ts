export interface IIncome {
    id: number
    amount: number
    date: string
    userId: number
}

export class Income implements IIncome {
    id: number
    amount: number
    date: string
    userId: number

    constructor(data: IIncome) {
        this.id = data.id
        this.amount = data.amount
        this.date = data.date
        this.userId = data.userId
    }

    static empty(): Income {
        const incomeData = {
            id: 0,
            amount: 0,
            date: new Date().toISOString(),
            userId: 0,
        }

        return new Income(incomeData)
    }
}
