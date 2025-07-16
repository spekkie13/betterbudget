import {Expense} from '@/types/models'
import {EXPENSE_BASE_URL} from "@/constants"
import {formRequestNoBody, formRequestWithBody} from "@/helpers"

export async function getExpensesByUser(userId: number): Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}?userId=${userId}`
    const request: Request = formRequestNoBody(url, 'GET')
    const response : Response = await fetch(request)

    if (!response.ok) {
        return [Expense.empty()]
    }

    const data : any = await response.json()

    return data.map((item: any) : Expense => {
        return formExpense(item)
    })
}

export async function getExpensesByCategoryAndDate(userId: number, id: number, periodId: number): Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}?userId=${userId}&categoryId=${id}&periodId=${periodId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    const response : Response = await fetch(request)

    if (!response.ok) {
        return [Expense.empty()]
    }

    const data : any = await response.json()
    return data.map((item: any) : Expense => formExpense(item))
}

export async function getExpensesByCategory(userId: number, categoryId: number): Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}?userId=${encodeURIComponent(userId)}&categoryId=${encodeURIComponent(categoryId)}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)
        if (!response.ok) {
            console.error(Error)
        }

        return fetch(request)
            .then((res: Response): Promise<any> => res.json())
            .then((res: any): any => {
                return res.map((item: any) => {
                    return formExpense(item)
                })
            })
            .catch((Error: any) => console.log(Error))
    } catch (error) {
        console.error('Failed to fetch expenses:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function createNewExpense(expense: Expense): Promise<boolean> {
    const request: RequestInfo = formRequestWithBody(EXPENSE_BASE_URL, 'POST', expense)
    const response: Response = await fetch(request)
    return await response.json()
}

export async function checkForExistingExpenses(userId: number, categoryId: number): Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}?userId=${userId}&categoryId=${categoryId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    const response: Response = await fetch(request)
    const data = await response.json()
    return data.map((item: any): Expense => {
        return new Expense(item)
    })
}

export async function updateExpenses(expenses: Expense[], newCategoryId: number): Promise<boolean> {
    try {
        const promises: Promise<Response>[] = expenses.map((obj: Expense) =>
            fetch(`${EXPENSE_BASE_URL}?id=${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({categoryId: newCategoryId}),
            })
        )

        const responses: Response[] = await Promise.all(promises)
        return responses.every((response: Response) => response.ok)
    } catch (error) {
        console.error('Error updating home ID:', error)
        return false
    }
}

export function formExpense(item: any): Expense {
    return new Expense({
        id: item.id,
        description: item.description,
        amount: Number.parseFloat(item.amount),
        date: item.date,
        userId: parseInt(item.userId),
        categoryId: parseInt(item.categoryId),
        isRecurring: item.isRecurring,
    })
}
