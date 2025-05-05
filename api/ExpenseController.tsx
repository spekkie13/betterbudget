import {Expense} from '@/models/expense'
import {EXPENSE_BASE_URL} from "@/constants/APIConstants"
import {DateObj} from "@/models/dateObj"
import {formExpense, formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";
import {dbExpense} from "@/models/dbExpense";

export async function fetchAllExpenses() : Promise<Expense[]> {
    const request : RequestInfo = formRequestNoBody(EXPENSE_BASE_URL, 'GET')
    const response = await fetch(request)
    const data = await response.json()
    return data.map((item : any) => {
        return formExpense(item)
    })
}

export async function fetchAllExpensesByUser(userId: number) : Promise<Expense[]>{
    const url = `${EXPENSE_BASE_URL}/${userId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    const response = await fetch(request)
    const data = await response.json()
    return data.map((item : any) => {
        return formExpense(item)
    })
}

export async function fetchExpensesByCategoryIdAndDate(userId: number, id: number, dateObj: DateObj): Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}/${userId}/${id}/${dateObj.month}-${dateObj.year}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        return fetch(request)
            .then((res : Response) : Promise<any> => res.json())
            .then((res : any) : any => {
                return res.map((item : any) => {
                    return formExpense(item)
                })
            })
            .catch((Error : any) => console.log(Error))
    } catch (error) {
        console.error('Failed to fetch expenses:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function fetchExpensesByCategoryId(userId: number, categoryId: number) : Promise<Expense[]> {
    const url = `${EXPENSE_BASE_URL}/${encodeURIComponent(userId)}/${encodeURIComponent(categoryId)}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response : Response = await fetch(request)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return fetch(request)
            .then((res : Response) : Promise<any> => res.json())
            .then((res: any) : any => {
                return res.map((item : any) => {
                    return formExpense(item)
                })
            })
            .catch((Error : any) => console.log(Error))
    } catch (error) {
        console.error('Failed to fetch expenses:', error)
        throw error // Re-throw the error after logging it
    }
}

export async function addNewExpense(expense: dbExpense) : Promise<boolean> {
    const request : RequestInfo = formRequestWithBody(EXPENSE_BASE_URL, 'POST', expense)
    const response : Response = await fetch(request)
    return await response.json()
}

export async function checkForExistingExpenses(userId: number, categoryId: number) : Promise<Expense[]>{
    const url = `${EXPENSE_BASE_URL}/${userId}/${categoryId}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    const response : Response = await fetch(request)
    const data = await response.json()
    return data.map((item: any) : Expense => {
        return new Expense(item)
    })
}

export async function updateExpenses(expenses : Expense[], newCategoryId: number) : Promise<boolean>{
    try {
        const promises : Promise<Response>[] = expenses.map((obj : Expense) =>
            fetch(`${EXPENSE_BASE_URL}/${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryId: newCategoryId }),
            })
        )

        const responses : Response[] = await Promise.all(promises)
        return responses.every((response : Response) => response.ok)
    } catch (error) {
        console.error('Error updating home ID:', error)
        return false
    }
}
