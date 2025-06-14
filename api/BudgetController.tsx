import {PERIOD_BUDGET_BASE_URL} from "@/constants/APIConstants"
import {Budget} from "@/models/budget"
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";
import {getIncomes} from "@/api/IncomeController";
import {getExpensesByUser} from "@/api/ExpenseController";

export async function getBudgetByCategoryAndDate(userId: number, categoryId : number, periodId: number) : Promise<Budget> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}&periodId=${periodId}`;
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data: ${response.statusText}`)
        }

        const data = await response.json()
        const budgetData = {
            id: data.id,
            amount: Number.parseInt(data.amount),
            categoryId: data.categoryId,
            userId: data.userId,
            periodId: periodId
        }

        return new Budget(budgetData)
    } catch (error) {
        console.error('Failed to fetch expenses:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function getBudgetByCategory(userId: number, categoryId : number) : Promise<Budget[]> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data:${response.statusText}`)
        }

        const data = await response.json()
        return data.map((item : any) : Budget => {
            return new Budget(item)
        })
    } catch (error) {
        console.error('Failed to fetch period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function getMostRecentBudgetByCategory(userId : number, categoryId : number) : Promise<Budget> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}/latest`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data: ${response.statusText}`)
        }

        const data = await response.json()
        return new Budget(data)
    } catch (error) {
        console.error('Failed to fetch most recent period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

// export async function createNewBudget(budgetData: {userId: number, categoryId: number, periodId: number, amount : number}) : Promise<boolean> {
//     try {
//         const request : RequestInfo = formRequestWithBody(PERIOD_BUDGET_BASE_URL, 'POST', budgetData)
//         const response : Response = await fetch(request)
//         if(response.ok){
//             return await response.json()
//         }
//         return false
//     }catch(err){
//         console.log(err)
//         throw err
//     }
// }

export async function updateBudgets(periodBudgets : Budget[], newCategoryId: number) : Promise<boolean>{
    try {
        const promises : Promise<Response>[] = periodBudgets.map((obj : Budget) =>
            fetch(formRequestWithBody(`${PERIOD_BUDGET_BASE_URL}?id=${obj.id}`, 'PATCH', {categoryId: newCategoryId})
        ))

        const responses : Response[] = await Promise.all(promises)
        return responses.every((response : Response) : boolean => response.ok)
    } catch (error) {
        console.error('Error updating Budget ID:', error)
        return false
    }
}

export async function determineSpendingRoom(userId: number) : Promise<number> {
    const incomes = await getIncomes(userId)
    const expenses = await getExpensesByUser(userId)
    const expenseSum : number = expenses.reduce((sum, current) => sum + Number(current.amount), 0)
    const incomeSum : number = incomes.reduce((sum, current) => sum + Number(current.amount), 0)

    let spendingRoom : number = Number.parseFloat(incomeSum.toFixed(2)) - Number.parseFloat(expenseSum.toFixed(2))
    if(Number.isNaN(spendingRoom)) {
        spendingRoom = 0
    }
    return spendingRoom
}
