import {PERIOD_BUDGET_BASE_URL} from "@/constants/APIConstants"
import {PeriodBudget} from "@/models/periodBudget"
import {DateObj} from "@/models/dateObj"
import {Category} from "@/models/category"
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";

export async function fetchPeriodBudgetByCategoryIdAndDate(userId: number, categoryId : number, DateObj : DateObj) : Promise<PeriodBudget> {
    const url = `${PERIOD_BUDGET_BASE_URL}/${userId}/${categoryId}/${DateObj.month}-${DateObj.year}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            throw new Error(`Failed to fetch periodBudget data: ${response.statusText}`)
        }

        const data = await response.json()
        return new PeriodBudget(data)
    } catch (error) {
        console.error('Failed to fetch expenses:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function fetchPeriodBudgetByCategoryId(userId: number, categoryId : number) : Promise<PeriodBudget[]> {
    const url = `${PERIOD_BUDGET_BASE_URL}/${userId}/${categoryId}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            throw new Error(`Failed to fetch periodBudget data: ${response.statusText}`)
        }

        const data = await response.json()
        return data.map((item : any) : PeriodBudget => {
            return new PeriodBudget(item)
        })
    } catch (error) {
        console.error('Failed to fetch period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function fetchMostRecentPeriodBudgetByCategoryId(userId : number, categoryId : number) : Promise<PeriodBudget> {
    const url = `${PERIOD_BUDGET_BASE_URL}/${userId}/${categoryId}/latest`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            throw new Error(`Failed to fetch periodBudget data: ${response.statusText}`)
        }

        const data = await response.json()
        return new PeriodBudget(data)
    } catch (error) {
        console.error('Failed to fetch most recent period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function insertNewPeriodBudget(userId: number, budget : number, category : Category, period : DateObj) : Promise<boolean> {
    try {
        const budgetData = {
            budget: budget,
            categoryId: category.id,
            id: 0,
            month: period.month,
            year: period.year,
            userId: userId
        }
        const periodBudget = new PeriodBudget(budgetData)

        const request : RequestInfo = formRequestWithBody(PERIOD_BUDGET_BASE_URL, 'POST', periodBudget)
        const response : Response = await fetch(request)
        if(response.ok){
            return await response.json()
        }

        return false
    }catch(err){
        console.log(err)
        throw err
    }
}

export async function updatePeriodBudgets(periodBudgets : PeriodBudget[], newCategoryId: number) : Promise<boolean>{
    try {
        const promises : Promise<Response>[] = periodBudgets.map((obj : PeriodBudget) =>
            fetch(formRequestWithBody(`${PERIOD_BUDGET_BASE_URL}/${obj.id}`, 'PATCH', {categoryId: newCategoryId})
        ))

        const responses : Response[] = await Promise.all(promises)
        return responses.every((response : Response) : boolean => response.ok)
    } catch (error) {
        console.error('Error updating PeriodBudget ID:', error)
        return false
    }
}

export async function deletePeriodBudget(periodBudgetId : number) : Promise<boolean>{
    try{
        const url = `${PERIOD_BUDGET_BASE_URL}/${periodBudgetId}`
        const request : RequestInfo = formRequestNoBody(url, 'POST')
        const response = await fetch(request)
        return response.ok
    }catch(error){
        console.log(error)
        throw error
    }
}
