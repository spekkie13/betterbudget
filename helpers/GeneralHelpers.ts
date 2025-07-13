export function ConvertToPercentage(part: number, total: number): number {
    if (Number.isNaN(part) || Number.isNaN(total) || part === undefined || total === undefined) {
        return 0
    } else {
        return part / total * 100
    }
}
