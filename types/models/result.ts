export interface IResult {
    id: number
    totalSpent: number
    percentageSpent?: number
    userId: number
    categoryId: number
    periodId: number
}

export class Result implements IResult {
    id: number
    totalSpent: number
    percentageSpent?: number
    userId: number
    categoryId: number
    periodId: number

    constructor(data: IResult) {
        this.id = data.id
        this.totalSpent = data.totalSpent
        this.percentageSpent = data.percentageSpent
        this.userId = data.userId
        this.categoryId = data.categoryId
        this.periodId = data.periodId
    }

    static empty(): Result {
        const resultData = {
            id: 0,
            totalSpent: 0,
            percentageSpent: 0,
            userId: 0,
            categoryId: 0,
            periodId: 0
        }

        return new Result(resultData)
    }
}
