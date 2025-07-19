import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/ctx"
import { preferenceStore } from "@/hooks"
import {
    getCategoryById,
    getExpensesByCategoryAndDate,
    getBudgetByCategoryAndPeriod,
    getResultByCategoryAndPeriod
} from "@/api"
import {Budget, Category, Expense, Period, Result} from "@/types/models"

interface UseCategoryDetailsOptions {
    categoryId: number;
    period: Period;
    fetchCategory?: boolean;
    fetchExpenses?: boolean;
    fetchBudget?: boolean;
    fetchResult?: boolean;
}

export function useCategoryDetails({ categoryId, period, fetchCategory = true, fetchExpenses = true, fetchBudget = true, fetchResult = true }: UseCategoryDetailsOptions) {
    const { userState } = useContext(AuthContext);
    const [categoryDetailsState, setCategoryDetailsState] = useState({
        loading: true,
        error: null as string | null,
        category: null as Category | null,
        expenses: [] as Expense[],
        budget: null as Budget | null,
        result: null as Result | null,
    })

    const valutaPref = preferenceStore.get('valuta')
    const valuta = valutaPref?.stringValue ?? "€"

    const userId = userState.user?.id
    useEffect(() => {
        if (!userState.user?.id || !period?.id) return;
        let isMounted = true;

        const loadData = async () => {
            if (!isMounted) return;

            setCategoryDetailsState(prev => ({
                ...prev,
                loading: true,
                error: null
            }))

            try {
                const categoryPromise : Promise<Category | null> = fetchCategory ? getCategoryById(userId, categoryId) : Promise.resolve(null);
                const expensesPromise : Promise<Expense[]> = fetchExpenses ? getExpensesByCategoryAndDate(userId, categoryId, period.id) : Promise.resolve([]);
                const budgetPromise : Promise<Budget> = fetchBudget ? getBudgetByCategoryAndPeriod(userId, categoryId, period.id) : Promise.resolve(Budget.empty());
                const resultPromise : Promise<Result | null> = fetchResult ? getResultByCategoryAndPeriod(userId, categoryId, period.id) : Promise.resolve(null);

                const [cat, exps, budget, resultRaw] = await Promise.all([
                    categoryPromise,
                    expensesPromise,
                    budgetPromise,
                    resultPromise,
                ]);

                if (!isMounted) return;

                setCategoryDetailsState(prev => {
                    const percentageSpent =
                        budget && budget.amount > 0 && resultRaw && !isNaN(resultRaw.totalSpent)
                            ? (resultRaw.totalSpent / budget.amount) * 100
                            : 0;

                    return {
                        ...prev,
                        loading: false,
                        category: cat || prev.category,
                        expenses: Array.isArray(exps) ? exps : prev.expenses,
                        budget: budget || prev.budget,
                        result: resultRaw ? {
                            ...resultRaw,
                            percentageSpent
                        } : prev.result
                    };
                });
            } catch (err) {
                if (!isMounted) return;

                setCategoryDetailsState(prev => ({
                    ...prev,
                    error: "Failed to load category details"
                }))
            } finally {
                setCategoryDetailsState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
        };

        loadData();

        return () => {
            isMounted = false;
        }
    }, [userId, categoryId, period?.id, fetchCategory, fetchExpenses, fetchBudget, fetchResult]);

    return {
        categoryDetailsState,
        valuta,
    };
}
