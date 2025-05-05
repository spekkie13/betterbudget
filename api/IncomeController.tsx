import {INCOME_BASE_URL} from "@/constants/APIConstants"
import {Income} from "@/models/income"
import {DateObj} from "@/models/dateObj"
import {Expense} from "@/models/expense";
import {formExpense, formRequestNoBody} from "@/api/ApiHelpers";

export async function FetchIncomes(userId: number) {
    const url = `${INCOME_BASE_URL}/${userId}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')
    const response : Response = await fetch(request)
    const data = await response.json()
    return data.map((item : any) => {
        return formExpense(item)
    })
}

export async function FetchIncomesByPeriod(userId: number, MonthAndYear : DateObj) : Promise<Income[]> {
    let incomes : Income[] = await FetchIncomes(userId)
    incomes = incomes
        .filter((income : Income) : boolean => income.incomeDate.getMonth() === MonthAndYear.month)
        .filter((income : Income) : boolean => income.incomeDate.getFullYear() === MonthAndYear.year)
        .sort(sortIncomesByDate)

    return incomes
}

export async function FetchIncomesByCategoryAndPeriod(userId: number, CategoryName : string, MonthAndYear : DateObj) : Promise<Income[]> {
    let incomes : Income[] = await FetchIncomes(userId)
    incomes = incomes
        .filter((income : Income) : boolean => income.category.name === CategoryName)
        .filter((income : Income) : boolean => income.incomeDate.getMonth() === MonthAndYear.month)
        .filter((income : Income) : boolean => income.incomeDate.getFullYear() === MonthAndYear.year)
        .sort(sortIncomesByDate)

    return incomes
}

export const sortIncomesByDate = (a : Income, b : Income) : number => {
    const dateA : Date = new Date(a.incomeDate)
    const dateB : Date = new Date(b.incomeDate)

    return dateA.getTime() - dateB.getTime()
}
