export interface IUserPreference {
    id: number;
    name: string;
    stringValue?: string;
    numberValue?: number;
    dateValue?: Date;
    userId: number;
}

export class UserPreference implements IUserPreference {
    id: number;
    name: string;
    stringValue?: string;
    numberValue?: number;
    dateValue?: Date;
    userId: number;

    constructor(data: IUserPreference) {
        this.id = data.id;
        this.name = data.name;
        this.stringValue = data.stringValue;
        this.numberValue = data.numberValue;
        this.dateValue = data.dateValue;
        this.userId = data.userId;
    }

    static empty(): UserPreference {
        const preferenceData = {
            id: 0,
            name: '',
            stringValue: '',
            numberValue: 0,
            dateValue: new Date(),
            userId: 0,
        }

        return new UserPreference(preferenceData);
    }
}

