import {INCOME_BASE_URL} from "@/constants/apiConstants"
import {formRequestNoBody} from "@/api/ApiHelpers";
import {Income} from "@/models/income";

export async function getIncomes(userId: number): Promise<Income[]> {
    const url = `${INCOME_BASE_URL}?userId=${userId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')
    const response: Response = await fetch(request)
    const data = await response.json()
    return await data.map((item: any) => {
        return formIncome(item)
    })
}

export function formIncome(item: any): Income {
    const incomeData = {
        id: item.id,
        amount: item.amount,
        userId: item.userId,
        date: item.date
    }
    return new Income(incomeData)
}
