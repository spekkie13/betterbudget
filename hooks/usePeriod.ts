import {useContext, useEffect, useState} from "react";
import {Period} from "@/types/models";
import {getMostRecentPeriod, getPeriodByDate} from "@/api";
import {AuthContext} from "@/app/ctx";
import {UsePeriodProps} from "@/types/props/usePeriodProps";

export function usePeriod({ category, mostRecent, date}: UsePeriodProps) {
    const [period, setPeriod] = useState<Period | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id || !category?.id) return;

        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const per = mostRecent
                    ? await getMostRecentPeriod(user.id, category.id)
                    : await getPeriodByDate(user.id, date);

                if (isMounted) {
                    setPeriod(per);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch period'));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [user?.id, category?.id, mostRecent, date]);

    return {
        period,
        loading,
        error
    }
}
