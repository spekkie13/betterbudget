import { UpdateCategoryProps } from "@/types/props"
import {useContext, useEffect, useState} from "react";
import { getResultByCategoryAndPeriod, UpdateResult } from "@/api";
import {AuthContext} from "@/app/ctx";
import {ConvertToPercentage} from "@/helpers";
import {Budget, Result} from "@/types/models";

export function useUpdateCategory({category, expenses, period} : UpdateCategoryProps) {
    const { user } = useContext(AuthContext)
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        if (!user?.id || !category?.id || !period?.id) return;

        const fetchData = async () => {
            const res = await getResultByCategoryAndPeriod(user.id, category.id, period.id)
            setResult(res)
        }

        fetchData()
    }, [category, expenses, period])

    async function updateResult (budget : Budget) {
        const result = await getResultByCategoryAndPeriod(user.id, category.id, period.id)

        const expenseSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        const percentageSpent = Number(ConvertToPercentage(expenseSum, budget.amount ?? 0).toFixed(2))

        const updatedResult = {
            ...result,
            totalSpent: expenseSum,
            percentageSpent: percentageSpent,
        }

        await UpdateResult(result.id, updatedResult)
    }

    return { result, updateResult }
}
