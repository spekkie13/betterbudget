export interface IBudget {
    id: number;
    amount: number;
    userId: number;
    categoryId: number;
    periodId: number;
}

export class Budget implements IBudget {
    id: number;
    amount: number;
    userId: number;
    categoryId: number;
    periodId: number;

    constructor(data: IBudget) {
        this.id = data.id;
        this.amount = data.amount;
        this.userId = data.userId;
        this.categoryId = data.categoryId;
        this.periodId = data.periodId;
    }
}
