import {DateObj} from "@/models/dateObj"
import {RecentPeriodResult} from "@/models/recentPeriodResult"
import {PERIOD_RESULT_BASE_URL} from "@/constants/APIConstants"
import {formRequestNoBody} from "@/api/ApiHelpers";

export async function fetchRecentPeriodResult(userId: number, categoryId : number,  dateObj : DateObj) : Promise<RecentPeriodResult> {
    const url = `${PERIOD_RESULT_BASE_URL}/${userId}/${categoryId}/${dateObj.month}-${dateObj.year}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    try {
        const response = await fetch(request)
        if (!response.ok) {
            throw new Error(`Failed to fetch recent period data: ${response.statusText}`)
        }

        const data = await response.json()
        return new RecentPeriodResult(data)
    } catch (error) {
        console.error('Failed to fetch recent period data:', error)
        throw error // Re-throw the error after logging it
    }
}
