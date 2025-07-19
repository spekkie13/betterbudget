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
        console.log('usePeriod inputs:', {
            userId: user?.id,
            date,
            categoryId
        });

        if (!user?.id) {
            console.log('Early return: no userId');
            return;
        }
        if (!date && !mostRecent) {
            console.log('Early return: no date and no mostRecent');
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
            console.log('Fetching period data');

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
                console.log('Period fetched:', per);

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
