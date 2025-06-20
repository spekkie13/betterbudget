export interface IIncome {
    id: number;
    amount: number;
    date: Date;
    userId: number;
}

export class Income implements IIncome {
    id: number;
    amount: number;
    date: Date;
    userId: number;

    constructor(data: IIncome) {
        this.id = data.id;
        this.amount = data.amount;
        this.date = data.date;
        this.userId = data.userId;
    }

    static empty(): Income {
        const incomeData = {
            id: 0,
            amount: 0,
            date: new Date(),
            userId: 0,
        }

        return new Income(incomeData);
    }
}
