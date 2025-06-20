export interface IPeriod {
    id: number;
    startDate: Date;
    endDate: Date;
}

export class Period implements IPeriod {
    id: number;
    startDate: Date;
    endDate: Date;

    constructor(data: IPeriod) {
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }

    static empty() : Period {
        const periodData = {
            id: 0,
            startDate: new Date(),
            endDate: new Date(),
        }

        return new Period(periodData);
    }
}
