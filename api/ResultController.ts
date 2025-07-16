import {Result} from "@/types/models"
import {PERIOD_RESULT_BASE_URL} from "@/constants"
import {formRequestNoBody, formRequestWithBody} from "@/helpers"

export async function getResultByCategoryAndPeriod(userId: number, categoryId: number, periodId: number): Promise<Result> {
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

export async function UpdateResult(id: number, result: Result){
    const body = {
        resultId: id,
        userId: result.userId,
        categoryId: result.categoryId,
        periodId: result.periodId,
        totalSpent: result.totalSpent,
        percentageSpent: result.percentageSpent,
    }

    console.log(body)
    const request = formRequestWithBody(`${PERIOD_RESULT_BASE_URL}/${id}`, 'PUT', body)
    const response = await fetch(request)

    if (!response.ok) {
        const errorText = await response.text()
        console.error('Update failed:', errorText)
        throw new Error(`Failed to update result with ID ${id}`)
    }

    return await response.json()
}
