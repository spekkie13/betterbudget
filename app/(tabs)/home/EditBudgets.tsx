import {ScrollView, View} from "react-native";
import {Button, Title} from "@/app/components/General";
import {useRouter} from "expo-router";
import {useThemeContext} from "@/theme/ThemeContext";
import {styles_editBudgets} from "@/styles/tabs/home/styles_editBudgets";
import BudgetPanel from "@/app/components/UI/BudgetPanel";

const EditBudgets = () => {
    const { currentTheme } = useThemeContext();
    const styles = styles_editBudgets(currentTheme);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Title text="Edit Budgets" />
            <ScrollView>
                <BudgetPanel />
            </ScrollView>
            <Button
                text='Back'
                style={{marginBottom: currentTheme.spacing.lg}}
                onPress={() => router.replace('/(tabs)/home')}/>
        </View>
    );
}

export default EditBudgets
