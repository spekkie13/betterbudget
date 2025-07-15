import {useContext, useEffect, useState} from "react";
import {Period} from "@/models/period";
import {getDistinctPeriods} from "@/api/PeriodController";
import {checkForExistingExpenses} from "@/api/ExpenseController";
import {categoryNameOther} from "@/constants/messageConstants";
import {AuthContext} from "@/app/ctx";

interface usePeriodsProps {
    categoryId: string
    categoryName: string
}

export function usePeriods({categoryId, categoryName}: usePeriodsProps) {
    const { user } = useContext(AuthContext)
    const [groupedDates, setGroupedDates] = useState<Map<number, number[]>>(new Map())
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [deleteMessage, setDeleteMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const categoryNumId : number = Number.parseInt(categoryId)
            const periods: Period[] = await getDistinctPeriods(user.id, categoryNumId)
            const grouped = new Map<number, number[]>()

            periods.forEach(({startDate}) => {
                const date = new Date(startDate)
                const year : number = date.getFullYear()
                const month : number = date.getMonth() + 1

                if (!grouped.has(year)) grouped.set(year, [])
                if (!grouped.get(year)!.includes(month)) {
                    grouped.get(year)!.push(month)
                }
            })

            for (const months of grouped.values()) {
                months.sort((a : number, b : number) : number => b - a)
            }

            setGroupedDates(new Map([...grouped.entries()].sort((a, b) => b[0] - a[0])))

            const expenses = await checkForExistingExpenses(user.id, categoryNumId)
            const message = categoryName === categoryNameOther
                ? 'Unable to delete this category'
                : expenses.length > 0
                    ? 'There are existing expenses in this category, are you sure you want to delete this category?'
                    : 'Are you sure you want to delete this category?'

            setDeleteMessage(message)
            setError(null)
            setLoading(false)
        }

        fetchData()
    }, [categoryId, categoryName, user.id])

    return {
        loading,
        error,
        groupedDates,
        deleteMessage,
    }
}
