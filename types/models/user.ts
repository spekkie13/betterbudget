export interface IUser {
    id: number
    email: string
    username: string
    name: string
    teamId?: number
}

export class User implements IUser {
    id: number
    email: string
    username: string
    name: string
    teamId?: number

    constructor(data: IUser) {
        this.id = data.id
        this.email = data.email
        this.username = data.username
        this.name = data.name
        this.teamId = data.teamId
    }

    static empty(): User {
        const userData = {
            id: 0,
            email: "",
            username: "",
            name: "",
            teamId: 0
        }

        return new User(userData)
    }
}
