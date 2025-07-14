import {Period} from "@/models/period"
import {DATE_BASE_URL, FIND_OR_CREATE_PERIOD_BASE_URL} from "@/constants/apiConstants"
import {formRequestNoBody} from "@/helpers/ApiHelpers"

export async function getMostRecentPeriod(UserId: number, CategoryId: number) {
    const url: string = `${DATE_BASE_URL}?userId=${UserId}&categoryId=${CategoryId}/recent`

    const request: RequestInfo = formRequestNoBody(url, 'GET')

    const response: Response = await fetch(request)
    const data = await response.json()

    return formPeriod(data)
}

export async function getDistinctPeriods(UserId: number, CategoryId: number): Promise<Period[]> {
    const url: string = `${DATE_BASE_URL}?userId=${UserId}&categoryId=${CategoryId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    const response: Response = await fetch(request)
    const data = await response.json()
    return data.map((item: any) => {
        return formPeriod(item)
    })
}

export async function getPeriodByDate(userId: number, date: Date) {
    const url = `${DATE_BASE_URL}?userId=${userId}&date=${date}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    const response: Response = await fetch(request)
    const data = await response.json()
    return data as Period
}

export function formPeriod(item: any): Period {
    const periodData = {
        id: item.id,
        startDate: item.startDate,
        endDate: item.endDate,
    }
    return new Period(periodData)
}

export async function getNextPeriod() {
    const now = new Date()
    const startYear = now.getUTCFullYear()
    const startMonth = now.getUTCMonth() // zero-based (0 = Jan)
    const startDate = new Date(Date.UTC(startYear, startMonth, 1))
    const endDate = new Date(Date.UTC(startYear, startMonth + 1, 0)) // last day of the month

    const response = await fetch(`${FIND_OR_CREATE_PERIOD_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate,
            endDate,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to get or create period')
    }

    const periodData : any = await response.json()
    return new Period(periodData)
}
