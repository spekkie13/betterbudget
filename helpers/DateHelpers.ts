import {MonthNames} from '@/constants/monthNames'

export function ConvertMonthToName(month: number): string {
    const monthNumber = month - 1
    return MonthNames[monthNumber]
}
