import {View, Text, useColorScheme, TouchableOpacity} from "react-native";
import {Link} from "expo-router";
import {Padding_MEDIUM} from "@/constants/UIConstants";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import Title from "@/app/general/Title";
import CustomButton from "@/app/general/CustomButton";
import {useContext, useState} from "react";
import {AuthContext} from "@/app/ctx";
import {getCategories} from "@/api/CategoryController";
import { Category } from "@/models/category"
import {Budget} from "@/models/budget";
import {getMostRecentBudgetByCategory} from "@/api/BudgetController";
import {useAsyncEffect} from "@/hooks/useAsyncEffect";

const ManageBudgets = () => {
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;

    const { user } = useContext(AuthContext)
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useAsyncEffect(async () => {
        let categories: Category[] = await getCategories(user.id);
        let budgets : Budget[] = [];
        for(let i = 0; i < categories.length; i++){
            budgets.push(await getMostRecentBudgetByCategory(user.id, categories[i].id))
        }
        setBudgets(budgets);
        setCategories(categories);
    }, [user.id])

    let categoryList = []
    for(let i = 0; i < categories.length; i++){
        const element = (
            <TouchableOpacity key={i}>
                <View>
                    <Text style={{color: currentTheme.colors.textColor}}>{categories[i].name} - {budgets[i].budget}</Text>
                </View>
            </TouchableOpacity>
        )
        categoryList.push(element)
    }
    return(
        <View
            style={{
                backgroundColor: currentTheme.colors.background,
                flex: 1,
                paddingTop: Padding_MEDIUM,
            }}>
            <Title text={'Manage Budgets'}/>
            {categoryList}
            <View style={{
                marginTop: 20,
                alignItems: 'center'
            }}>
                <Link href='/(tabs)/profile'>
                    <CustomButton color={'blue'} text={'Back'} />
                </Link>
            </View>
        </View>
    )
}

export default ManageBudgets;
