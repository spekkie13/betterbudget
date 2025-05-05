import {DateObj} from "@/models/dateObj"
import {DATE_BASE_URL} from "@/constants/APIConstants"
import {formRequestNoBody} from "@/api/ApiHelpers";

export async function FetchDistinctDates(UserId : number, CategoryId : number) : Promise<DateObj[]> {
    const url : string = `${DATE_BASE_URL}/${UserId}/${CategoryId}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    const response : Response = await fetch(request)
    const data : any = await response.json()
    return data as DateObj[]
}

export async function GetDateObjById(id: number) : Promise<DateObj> {
    const url : string = `${DATE_BASE_URL}/${id}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    const response : Response = await fetch(request)
    const data : any = await response.json()
    return data as DateObj
}

export async function GetDates() : Promise<DateObj[]> {
    const request : RequestInfo = formRequestNoBody(DATE_BASE_URL, 'GET')
    const response : Response = await fetch(request)
    const data : any = await response.json()
    return data as DateObj[]
}

export async function FetchDateByMonthAndYear(month: number, year : number) : Promise<DateObj> {
    const dates : DateObj[] = await GetDates()
    return dates.filter(d => d.month == month && d.year == year)[0]
}
