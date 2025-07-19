import {ScrollView, View} from "react-native";
import {Button, Title} from "@/app/components/General";
import {useRouter} from "expo-router";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_editBudgets} from "@/styles/tabs/home/styles_editBudgets";
import BudgetPanel from "@/app/components/UI/BudgetPanel";
import {useCallback, useMemo, useRef, useEffect} from "react";

const EditBudgets = () => {
    const { currentTheme } = useThemeContext();
    const styles = useMemo(() => styles_editBudgets(currentTheme), [currentTheme]);

    const buttonStyle = useMemo(() => ({
        marginBottom: currentTheme.spacing.lg
    }), [currentTheme.spacing.lg]);

    const router = useRouter();

    const routerRef = useRef(router);
    useEffect(() => {
        routerRef.current = router;
    }, [router]);

    const handleBack = useCallback(() => {
        routerRef.current.replace('/(tabs)/home');
    }, []);

    return (
        <View style={styles.container}>
            <Title text="Edit Budgets" />
            <ScrollView>
                <BudgetPanel />
            </ScrollView>
            <Button
                text='Back'
                style={buttonStyle}
                onPress={handleBack}
            />
        </View>
    );
}

export default EditBudgets
