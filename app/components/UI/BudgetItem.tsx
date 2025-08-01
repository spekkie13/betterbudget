import { Text, View } from "react-native";
import { InputField } from "@/app/components/General";
import {useThemeContext} from "@/theme/ThemeContext";
import React from "react";

const BudgetItem = React.memo(({ name, budget }: { name: string; budget: number }) => {
    const { currentTheme } = useThemeContext();
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                alignItems: "center",
                padding: 8,
                borderRadius: 8,
            }}
        >
            <Text style={{ marginBottom: 4, fontWeight: "600", fontSize: 16, color: currentTheme.colors.textColor }}>
                {name}
            </Text>
            <InputField
                value={budget.toString()}
                label="Budget"
                secure={false}
                disabled={true}
            />
        </View>
    );
});

export default BudgetItem;
