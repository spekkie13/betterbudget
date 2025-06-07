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
}
