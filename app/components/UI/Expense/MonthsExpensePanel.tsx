import {Text, View} from "react-native";
import {CustomLink} from "@/app/components/General/CustomLink";
import {ConvertMonthToName} from "@/helpers/DateHelpers";
import React from "react";
import { useRouter } from "expo-router";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_expenseMonthSelection} from "@/styles/tabs/expense/styles_expenseMonthSelection";
import {ExpensePanelProps} from "@/types/props";

const MonthsExpensePanel = ({groupedDates, categoryId}: ExpensePanelProps) => {
    const router = useRouter()
    const { currentTheme } = useThemeContext()
    const styles = styles_expenseMonthSelection(currentTheme)

    return (
        <View>
            {Array.from(groupedDates.entries()).map(([year, months]) => (
                <View key={year}>
                    <Text style={styles.headerText}>{year}</Text>
                    {months.map(month => (
                        <CustomLink
                            key={month}
                            text={`- ${ConvertMonthToName(month)}`}
                            style={styles.monthItem}
                            onPress={() => router.replace(`/(tabs)/category/${categoryId}/${month}/${year}`)}/>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default MonthsExpensePanel
