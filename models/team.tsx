export interface ITeam {
    id: number;
    name: string;
}

export class Team implements ITeam {
    id: number;
    name: string;

    constructor(data: ITeam) {
        this.id = data.id;
        this.name = data.name;
    }
}
