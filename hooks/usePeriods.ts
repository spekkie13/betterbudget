import {useContext, useEffect, useState, useCallback} from "react";
import {Expense, Period} from "@/types/models"
import { getDistinctPeriods, checkForExistingExpenses } from '@/api'
import {categoryNameOther} from "@/constants"
import {AuthContext} from "@/app/ctx"
import {PeriodProps} from "@/types/props"

export function usePeriods({categoryId, categoryName}: PeriodProps) {
    const { userState } = useContext(AuthContext)
    const user = userState.user

    const [periodsState, setPeriodsState] = useState({
        groupedDates: new Map<number, number[]>(),
        loading: true,
        error: undefined as string | undefined,
        deleteMessage: '',
    })

    const updateGroupedDates = useCallback((grouped: Map<number, number[]>) => {
        return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]))
    }, [])

    const userId = user?.id
    useEffect(() => {
        const fetchData = async () => {
            try {
                setPeriodsState(prev => ({
                    ...prev,
                    loading: true
                }))

                const categoryNumId: number = Number.parseInt(categoryId)
                const periods: Period[] = await getDistinctPeriods(user.id, categoryNumId)
                const grouped = new Map<number, number[]>()

                periods.forEach(({startDate}) => {
                    const date = new Date(startDate)
                    const year: number = date.getFullYear()
                    const month: number = date.getMonth() + 1

                    if (!grouped.has(year)) grouped.set(year, [])
                    if (!grouped.get(year)!.includes(month)) {
                        grouped.get(year)!.push(month)
                    }
                })

                for (const months of grouped.values()) {
                    months.sort((a: number, b: number): number => b - a)
                }

                const groupedDatesMap = updateGroupedDates(grouped)

                const expenses: Expense[] = await checkForExistingExpenses(user.id, categoryNumId)
                const message: string = categoryName === categoryNameOther
                    ? 'Unable to delete this category'
                    : expenses.length > 0
                        ? 'There are existing expenses in this category, are you sure you want to delete this category?'
                        : 'Are you sure you want to delete this category?'

                setPeriodsState(prev => ({
                    ...prev,
                    groupedDates: groupedDatesMap,
                    deleteMessage: message,
                    error: undefined,
                    loading: false
                }))
            } catch (error) {
                setPeriodsState(prev => ({
                    ...prev,
                    error: error.message,
                    loading: false
                }))
                console.error(error)
            }
        }

        fetchData()
    }, [categoryId, categoryName, userId, updateGroupedDates])

    return {
        periodsState
    }
}
