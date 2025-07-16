import {useContext, useEffect, useState} from "react";
import {Period} from "@/types/models";
import {getMostRecentPeriod, getPeriodByDate} from "@/api";
import {AuthContext} from "@/app/ctx";
import {UsePeriodProps} from "@/types/props/usePeriodProps";

export function usePeriod({ category, mostRecent, date}: UsePeriodProps) {
    const [period, setPeriod] = useState<Period>(null)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (mostRecent) {
                const per = await getMostRecentPeriod(user.id, category.id)
                setPeriod(per)
            } else {
                const per = await getPeriodByDate(user.id, date)
                setPeriod(per)
            }
        }

        fetchData()
    }, [])

    return {
        period
    }
}
