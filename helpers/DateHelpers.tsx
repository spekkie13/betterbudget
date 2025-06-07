export function ConvertMonthToName(month : number) : string {
    const monthNumber = month - 1
    return monthNames[monthNumber]
}

const monthNames : string[] = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
];
