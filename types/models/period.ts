export interface IPeriod {
    id: number
    startDate: Date
    endDate: Date
    startAmount: number
}

export class Period implements IPeriod {
    id: number
    startDate: Date
    endDate: Date
    startAmount: number

    constructor(data: IPeriod) {
        this.id = data.id
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.startAmount = data.startAmount
    }

    static empty(): Period {
        const periodData = {
            id: 0,
            startDate: new Date(),
            endDate: new Date(),
            startAmount: 0,
        }

        return new Period(periodData)
    }
}
