import {useContext, useEffect, useState} from "react";
import {Category} from "@/models/category";
import {Expense} from "@/models/expense";
import {Result} from "@/models/periodresult";
import {preferenceStore} from "@/hooks/preferenceStore";
import {getPeriodByDate} from "@/api/PeriodController";
import {getCategoryById} from "@/api/CategoryController";
import {getExpensesByCategoryAndDate} from "@/api/ExpenseController";
import {getBudgetByCategoryAndDate} from "@/api/BudgetController";
import {getMostRecentResult} from "@/api/ResultController";
import {AuthContext} from "@/app/ctx";

interface CategoryDetailsProps {
    Month: string
    Year: string
    CategoryId: string
}

export function useCategoryDetails({Month, Year, CategoryId}: CategoryDetailsProps) {
    const { user } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [category, setCategory] = useState<Category | null>(null)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [budgetAmount, setBudgetAmount] = useState<number>(0)
    const [result, setResult] = useState<Result | null>(null)
    const [valuta, setValuta] = useState<string>("$")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parsedMonth : number = parseInt(Month) - 1
                const parsedYear : number = parseInt(Year)
                const parsedCategoryId : number = parseInt(CategoryId)
                const valutaPref = preferenceStore.get('valuta')

                const [period, cat] = await Promise.all([
                    getPeriodByDate(user.id, new Date(parsedYear, parsedMonth, 1)),
                    getCategoryById(user.id, parsedCategoryId)
                ])

                const [expenses, budget, resultRaw] = await Promise.all([
                    getExpensesByCategoryAndDate(user.id, cat.id, period.id),
                    getBudgetByCategoryAndDate(user.id, cat.id, period.id),
                    getMostRecentResult(user.id, cat.id, period.id)
                ])

                const percentageSpent = !isNaN(resultRaw.totalSpent)
                    ? (resultRaw.totalSpent / budget.amount) * 100
                    : 0

                const result = {
                    ...resultRaw,
                    percentageSpent,
                }

                setCategory(cat)
                setExpenses(expenses)
                setBudgetAmount(budget.amount)
                setResult(result)
                setValuta(valutaPref?.stringValue ?? '$')
            } catch (err) {
                console.error(err)
                setError('Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user.id, CategoryId, Month, Year])

    return {
        category, expenses, budgetAmount, result, valuta, loading, error
    }
}
