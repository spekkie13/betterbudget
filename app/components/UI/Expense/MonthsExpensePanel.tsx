import {Text, View} from "react-native";
import {CustomLink} from "@/app/components/General/CustomLink";
import {ConvertMonthToName} from "@/helpers/DateHelpers";
import React, {useCallback, useMemo} from "react";
import { useRouter } from "expo-router";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_expenseMonthSelection} from "@/styles/tabs/expense/styles_expenseMonthSelection";
import {ExpensePanelProps} from "@/types/props";

const MonthsExpensePanel = ({groupedDates, categoryId}: ExpensePanelProps) => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_expenseMonthSelection(currentTheme), [currentTheme])

    const router = useRouter()
    const handleClickMonthItem = useCallback((month: number, year: number) => {
        router.replace(`/(tabs)/category/${categoryId}/${month}/${year}`)
    }, [router, categoryId])

    return (
        <View>
            {Array.from(groupedDates.entries()).map(([year, months]) => (
                <View key={year}>
                    <Text style={styles.headerText}>{year}</Text>
                    {months.map((month : number) => (
                        <CustomLink
                            key={month}
                            text={`- ${ConvertMonthToName(month)}`}
                            style={styles.monthItem}
                            onPress={() => handleClickMonthItem(month, year)}/>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default MonthsExpensePanel
