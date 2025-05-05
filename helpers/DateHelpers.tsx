import {DateObj} from "@/models/dateObj";

export function FormatDate(date : DateObj) : string {
    // const day = date.day.toString().padStart(2, "0")
    // const month = date.month.toString().padStart(2, "0")
    // const year = date.year.toString().padStart(2, "0")

    return `${date.day}-${date.month}-${date.year}`
}

export function ConvertMonthToName(month : number) : string {
    const monthNumber = month - 1
    return monthNames[monthNumber]
}

export function ConvertDateToMonthName(helperDate : DateObj) : string {
    return monthNames[helperDate.month]
}

const monthNames : string[] = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
];
