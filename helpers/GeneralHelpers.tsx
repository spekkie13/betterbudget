export function GetPercentageSpent(spent : number, budget : number) : number {
    if (Number.isNaN(spent) || Number.isNaN(budget) || spent === undefined || budget === undefined) {
        return 0
    }else{
        return spent / budget * 100
    }
}

