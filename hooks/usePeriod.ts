import {useContext, useEffect, useState} from "react";
import {Period} from "@/types/models";
import {getCategoryById, getMostRecentPeriod, getPeriodByDate} from "@/api";
import {AuthContext} from "@/app/ctx";
import {UsePeriodProps} from "@/types/props/usePeriodProps";

export function usePeriod({ categoryId, mostRecent, date}: UsePeriodProps) {
    const [periodState, setPeriodState] = useState({
        loading: true,
        error: undefined as string | undefined,
        period: null as Period | null,
    })

    const { userState } = useContext(AuthContext);
    const user = userState.user;
    const userId = user?.id;

    useEffect(() => {
        if (!user?.id) {
            return;
        }
        if (!date && !mostRecent) {
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
            const category = await getCategoryById(user.id, categoryId);
            try {
                setPeriodState(prev => ({
                    ...prev,
                    error: undefined,
                    loading: true
                }))
                const per = mostRecent === true
                    ? await getMostRecentPeriod(user.id, category.id)
                    : await getPeriodByDate(user.id, date);

                setPeriodState(prev => ({
                    ...prev,
                    period: per,
                    loading: false
                }))
            } catch (err) {
                if (isMounted) {
                    setPeriodState(prev => ({
                        ...prev,
                        error: err.message
                    }))
                }
            } finally {
                setPeriodState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [userId, mostRecent, date, categoryId]);

    return {
        periodState
    }
}
