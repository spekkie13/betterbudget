import {Expense} from "@/models/expense";
import {DateObj} from "@/models/dateObj";
import {userPreference} from "@/models/userPreference";

function getHeaders() : Headers {
    const headers: Headers = new Headers()
    headers.set("Accept", "plain/text")
    headers.set("Content-Type", "application/json")
    return headers
}

export function formRequestNoBody(url: string, method: string) : RequestInfo {
    return new Request(url, {
        method: method,
        headers: getHeaders()
    })
}

export function formRequestWithBody(url : string, method: string, body : any){
    return new Request(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}

export function formExpense(item : any) : Expense {
    const dateString = item.date.split('T')[0]
    const year = dateString.split('-')[0]
    const month = dateString.split('-')[1]
    const day = dateString.split('-')[2]

    const dateObj = {
        id: 0,
        month: month,
        year: year,
        day: day
    }
    const date : DateObj = new DateObj(dateObj)

    const ExpenseData = {
        amount: item.amount,
        categoryId: item.categoryId,
        date: date,
        description: item.description,
        id: item.id,
        isRecurring: item.isRecurring,
        userId: item.userId,
    }
    return new Expense(ExpenseData)
}

export function formPreference(item : any) : userPreference {
    const preferenceData = {
        id: item.id,
        userId: item.userId,
        name: item.name,
        stringValue: item.stringValue,
        numberValue: item.numberValue,
        dateValue: item.dateValue
    }

    return new userPreference(preferenceData)
}

export async function determineSpendingRoom(expenses : Expense[], incomes : Expense[]) : Promise<number> {
    const expenseSum : number = expenses.reduce((sum, current) => sum + current.amount, 0)
    const incomeSum : number = incomes.reduce((sum, current) => sum + current.amount, 0)
    let spendingRoom : number = incomeSum - Number.parseFloat(expenseSum.toFixed(2))
    if(Number.isNaN(spendingRoom)) {
        spendingRoom = 0
    }
    return spendingRoom
}
