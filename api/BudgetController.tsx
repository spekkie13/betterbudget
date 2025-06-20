import {PERIOD_BUDGET_BASE_URL} from "@/constants/apiConstants"
import {Budget} from "@/models/budget"
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";
import {getIncomes} from "@/api/IncomeController";
import {getExpensesByUser} from "@/api/ExpenseController";

/*
fetch all budgets for a specific period, category and user
UserId -> ID of the user to fetch the budgets for
CategoryId -> ID of the category to fetch the budgets for
PeriodId -> ID of the period to fetch the budgets for
*/
export async function getBudgetByCategoryAndDate(userId: number, categoryId: number, periodId: number): Promise<Budget> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}&periodId=${periodId}`;
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data: ${response.statusText}`)
            return Budget.empty()
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

/*
fetch all budgets for a specific category and user
UserId -> ID of the user to fetch the budgets for
CategoryId -> ID of the category to fetch the budgets for
*/
export async function getBudgetByCategory(userId: number, categoryId: number): Promise<Budget[]> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data:${response.statusText}`)
            return [Budget.empty()]
        }

        const data = await response.json()
        return data.map((item: any): Budget => {
            return new Budget(item)
        })
    } catch (error) {
        console.error('Failed to fetch period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

/*
fetch the most recent budget for a specific category and user
returns a single budget object or an empty array when no budget was found

UserId -> ID of the user to fetch the budgets for
CategoryId -> ID of the category to fetch the budgets for
*/
// export async function getMostRecentBudgetByCategory(userId : number, categoryId : number) : Promise<Budget> {
//     const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}/latest`
//     const request : RequestInfo = formRequestNoBody(url, 'GET')
//
//     try {
//         const response : Response = await fetch(request)
//         if (!response.ok) {
//             console.log(`Failed to fetch periodBudget data: ${response.statusText}`)
//             return Budget.empty()
//         }
//
//         const data = await response.json()
//         return new Budget(data)
//     } catch (error) {
//         console.error('Failed to fetch most recent period budget data:', error)
//         throw error // Re-throw the error after logging it
//     }
// }

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

/*
update the categoryId for all budgets
returns a boolean representing whether the update was successful or not

periodBudgets -> all budgets to be updated
newCategoryId -> new category ID to be set for the budgets
*/
export async function updateBudgets(periodBudgets: Budget[], newCategoryId: number): Promise<boolean> {
    try {
        const promises: Promise<Response>[] = periodBudgets.map((obj: Budget) =>
            fetch(formRequestWithBody(`${PERIOD_BUDGET_BASE_URL}?id=${obj.id}`, 'PATCH', {categoryId: newCategoryId})
            ))

        const responses: Response[] = await Promise.all(promises)
        return responses.every((response: Response): boolean => response.ok)
    } catch (error) {
        console.error('Error updating Budget ID:', error)
        return false
    }
}

/*
determine the spending room (income - expenses) for a specific user
returns a number which represents the spending room

UserId -> User ID to determine the spending room for
*/
export async function determineSpendingRoom(userId: number): Promise<number> {
    const incomes = await getIncomes(userId)
    const expenses = await getExpensesByUser(userId)
    const expenseSum: number = expenses.reduce((sum, current) => sum + Number(current.amount), 0)
    const incomeSum: number = incomes.reduce((sum, current) => sum + Number(current.amount), 0)

    let spendingRoom: number = Number.parseFloat(incomeSum.toFixed(2)) - Number.parseFloat(expenseSum.toFixed(2))
    if (Number.isNaN(spendingRoom)) {
        spendingRoom = 0
    }
    return spendingRoom
}
