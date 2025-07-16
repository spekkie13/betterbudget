import { UpdateCategoryProps } from "@/types/props"
import {useContext, useEffect, useState} from "react";
import {getBudgetByCategoryAndPeriod, getResultByCategoryAndPeriod, UpdateResult} from "@/api";
import {AuthContext} from "@/app/ctx";
import {ConvertToPercentage} from "@/helpers";
import {Budget, Result} from "@/types/models";

export function useUpdateCategory({category, expenses, period} : UpdateCategoryProps) {
    const { user } = useContext(AuthContext)
    const [result, setResult] = useState<Result | null>(null)
    const [budget, setBudget] = useState<Budget | null>(null)

    useEffect(() => {
        if (!user?.id || !category?.id || !period?.id) return;

        const fetchData = async () => {
            const res = await getResultByCategoryAndPeriod(user.id, category.id, period.id)
            const bud = await getBudgetByCategoryAndPeriod(user.id, category.id, period.id)
            setResult(res)
            setBudget(bud)
        }

        fetchData()
    }, [category, expenses, period])

    async function updateResult () {
        const expenseSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        const percentageSpent = ConvertToPercentage(expenseSum, budget.amount)

        result.totalSpent = expenseSum
        result.percentageSpent = percentageSpent

        await UpdateResult(result.id, result)
    }

    return { result, updateResult }
}
