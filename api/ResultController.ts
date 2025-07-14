import {Result} from "@/models/periodresult"
import {PERIOD_RESULT_BASE_URL} from "@/constants/apiConstants"
import {formRequestNoBody} from "@/helpers/ApiHelpers"

export async function getMostRecentResult(userId: number, categoryId: number, periodId: number): Promise<Result> {
    const url = `${PERIOD_RESULT_BASE_URL}?userId=${userId}&categoryId=${categoryId}&periodId=${periodId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    try {
        const response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch recent period data: ${response.statusText}`)
        }
        const data = await response.json()
        const resultData = {
            categoryId: data.categoryId,
            id: data.id,
            percentageSpent: Number.parseFloat(data.percentageSpent),
            periodId: data.periodId,
            totalSpent: Number.parseFloat(data.totalSpent),
            userId: data.userId,
        }
        return new Result(resultData)
    } catch (error) {
        console.error('Failed to fetch recent period data:', error)
        throw error
    }
}
