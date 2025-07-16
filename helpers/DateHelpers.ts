import {MonthNames} from '@/constants'

export function ConvertMonthToName(month: number): string {
    const monthNumber = month - 1
    return MonthNames[monthNumber]
}
