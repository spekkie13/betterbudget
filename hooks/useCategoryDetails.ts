import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/ctx"
import { preferenceStore } from "@/hooks"
import {
    getCategoryById,
    getExpensesByCategoryAndDate,
    getBudgetByCategoryAndPeriod,
    getResultByCategoryAndPeriod
} from "@/api"
import {Category, Expense, Period, Result} from "@/types/models"

interface UseCategoryDetailsOptions {
    categoryId: number;
    period: Period;
    fetchCategory?: boolean;
    fetchExpenses?: boolean;
    fetchBudget?: boolean;
    fetchResult?: boolean;
}

interface EnhancedResult extends Result {
    percentageSpent?: number
}

export function useCategoryDetails({ categoryId, period, fetchCategory = true, fetchExpenses = true, fetchBudget = true, fetchResult = true }: UseCategoryDetailsOptions) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [budgetAmount, setBudgetAmount] = useState<number>(0);
    const [result, setResult] = useState<EnhancedResult | null>(null);
    const valutaPref = preferenceStore.get('valuta')
    const valuta = valutaPref.stringValue

    useEffect(() => {
        if (!user?.id || !period?.id) return;

        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const categoryPromise : Promise<Category | null> = fetchCategory ? getCategoryById(user.id, categoryId) : Promise.resolve(null);
                const expensesPromise : Promise<Expense[]> = fetchExpenses ? getExpensesByCategoryAndDate(user.id, categoryId, period.id) : Promise.resolve([]);
                const budgetPromise : Promise<{ amount: number }> = fetchBudget ? getBudgetByCategoryAndPeriod(user.id, categoryId, period.id) : Promise.resolve({ amount: 0 });
                const resultPromise : Promise<Result | null> = fetchResult ? getResultByCategoryAndPeriod(user.id, categoryId, period.id) : Promise.resolve(null);

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
    }, [user?.id, categoryId, period, fetchCategory, fetchExpenses, fetchBudget, fetchResult]);

    return {
        category,
        expenses,
        budgetAmount,
        result,
        valuta,
        loading,
        error,
        spent: result?.totalSpent ?? 0,
        percentageSpent: result?.percentageSpent ?? 0
    };
}
