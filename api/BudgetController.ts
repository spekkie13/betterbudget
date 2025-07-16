import {PERIOD_BUDGET_BASE_URL} from "@/constants"
import {Budget, Expense, Income, Period} from "@/types/models"
import {formRequestNoBody, formRequestWithBody} from "@/helpers"
import {getExpensesByUser, getIncomes, getPeriodByDate} from "@/api"

export async function getBudgetByCategoryAndPeriod(userId: number, categoryId: number, periodId: number): Promise<Budget> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}&periodId=${periodId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data: ${response.statusText}`)
            return Budget.empty()
        }

        const data : any = await response.json()
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
        throw error
    }
}

export async function getBudgetByCategory(userId: number, categoryId: number): Promise<Budget[]> {
    const url = `${PERIOD_BUDGET_BASE_URL}?userId=${userId}&categoryId=${categoryId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)
        if (!response.ok) {
            console.log(`Failed to fetch periodBudget data:${response.statusText}`)
            return [Budget.empty()]
        }

        const data : any = await response.json()
        return data.map((item: any): Budget => {
            return new Budget(item)
        })
    } catch (error) {
        console.error('Failed to fetch period budget data:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function updateBudgets(periodBudgets: Budget[], newCategoryId: number): Promise<boolean> {
    try {
        const promises: Promise<Response>[] = periodBudgets.map((obj: Budget) =>
            fetch(formRequestWithBody(`${PERIOD_BUDGET_BASE_URL}?id=${obj.id}`, 'PATCH', {categoryId: newCategoryId})))

        const responses: Response[] = await Promise.all(promises)
        return responses.every((response: Response): boolean => response.ok)
    } catch (error) {
        console.error('Error updating Budget ID:', error)
        return false
    }
}

export async function determineSpendingRoom(userId: number): Promise<number> {
    const mostRecentPeriod : Period = await getPeriodByDate(userId, new Date())

    let incomes : Income[] = await getIncomes(userId)
    let expenses : Expense[] = await getExpensesByUser(userId)

    incomes = incomes.filter((income: Income) : boolean => new Date(income.date) > new Date(mostRecentPeriod.startDate))
    expenses = expenses.filter((expense: Expense) : boolean => new Date(expense.date) > new Date(mostRecentPeriod.startDate))

    const expenseSum: number = expenses.reduce((sum : number, current : Expense) : number => sum + Number(current.amount), 0)
    const incomeSum: number = incomes.reduce((sum : number, current : Income) : number => sum + Number(current.amount), 0)

    let spendingRoom: number = Number.parseFloat(incomeSum.toFixed(2)) - Number.parseFloat(expenseSum.toFixed(2))
    if (Number.isNaN(spendingRoom)) {
        spendingRoom = 0
    }
    return spendingRoom
}
