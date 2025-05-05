export class DateObj implements IDateObj{
    id: number
    year: number
    month: number
    day: number

    constructor(data : IDateObj)
    {
        this.id = data.id
        this.year = data.year
        this.month = data.month
        this.day = data.day
    }

    public ToString() : string{
        return `Date Obj - Id: ${this.id}, Year: ${this.year}, Month: ${this.month}, Day: ${this.day}`
    }
}

interface IDateObj {
    id: number,
    year: number,
    month: number,
    day: number,
}
