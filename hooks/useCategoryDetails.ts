import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/ctx"
import { preferenceStore } from "@/hooks"
import {
    getMostRecentPeriod,
    getPeriodByDate,
    getCategoryById,
    getExpensesByCategoryAndDate,
    getBudgetByCategoryAndPeriod,
    getResultByCategoryAndPeriod
} from "@/api"
import {Category, Expense, Period, Result} from "@/types/models"

interface UseCategoryDetailsOptions {
    date?: Date;
    periodId?: number;
    categoryId: number;
    fetchCategory?: boolean;
    fetchExpenses?: boolean;
    fetchBudget?: boolean;
    fetchResult?: boolean;
    mostRecent?: boolean;
}

interface EnhancedResult extends Result {
    percentageSpent?: number
}

export function useCategoryDetails({ date, periodId, categoryId, fetchCategory = true, fetchExpenses = true, fetchBudget = true, fetchResult = true, mostRecent }: UseCategoryDetailsOptions) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [period, setPeriod] = useState<Period>();
    const [budgetAmount, setBudgetAmount] = useState<number>(0);
    const [result, setResult] = useState<EnhancedResult | null>(null);
    const valutaPref = preferenceStore.get('valuta')
    const valuta = valutaPref.stringValue

    useEffect(() => {
        if (!user?.id) return;

        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                let resolvedPeriodId = periodId;
                if (!resolvedPeriodId) {
                    if (!date && !mostRecent) {
                        console.log("Must provide either date or periodId")
                    }
                    if (mostRecent) {
                        const period = await getMostRecentPeriod(user.id, categoryId)
                        setPeriod(period)
                        resolvedPeriodId = period.id;
                    } else {
                        const period = await getPeriodByDate(user.id, date);
                        setPeriod(period);
                        resolvedPeriodId = period.id;
                    }
                }

                const categoryPromise : Promise<Category | null> = fetchCategory ? getCategoryById(user.id, categoryId) : Promise.resolve(null);
                const expensesPromise : Promise<Expense[]> = fetchExpenses ? getExpensesByCategoryAndDate(user.id, categoryId, resolvedPeriodId!) : Promise.resolve([]);
                const budgetPromise : Promise<{ amount: number }> = fetchBudget ? getBudgetByCategoryAndPeriod(user.id, categoryId, resolvedPeriodId!) : Promise.resolve({ amount: 0 });
                const resultPromise : Promise<Result | null> = fetchResult ? getResultByCategoryAndPeriod(user.id, categoryId, resolvedPeriodId!) : Promise.resolve(null);

                const [cat, exps, budget, resultRaw] = await Promise.all([
                    categoryPromise,
                    expensesPromise,
                    budgetPromise,
                    resultPromise,
                ]);

                if (cat) setCategory(cat);
                if (Array.isArray(exps)) setExpenses(exps);
                if (budget && typeof budget.amount === "number") setBudgetAmount(budget.amount);

                if (resultRaw) {
                    const percentageSpent =
                        budget && budget.amount > 0 && !isNaN(resultRaw.totalSpent)
                            ? (resultRaw.totalSpent / budget.amount) * 100
                            : 0;

                    setResult({
                        ...resultRaw,
                        percentageSpent,
                    });
                }
            } catch (err) {
                console.error("Error in useCategoryDetails:", err);
                setError("Failed to load category details");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user?.id, categoryId, date?.getTime(), periodId, fetchCategory, fetchExpenses, fetchBudget, fetchResult]);

    return {
        category,
        expenses,
        budgetAmount,
        period,
        result,
        valuta,
        loading,
        error,
        spent: result?.totalSpent ?? 0,
        percentageSpent: result?.percentageSpent ?? 0
    };
}
