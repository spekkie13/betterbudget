import {View, Text, useColorScheme, TouchableOpacity} from "react-native";
import {Link} from "expo-router";
import {Padding_MEDIUM} from "@/constants/UIConstants";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import Title from "@/app/general/Title";
import CustomButton from "@/app/general/CustomButton";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/app/ctx";
import {fetchCategories} from "@/api/CategoryController";
import { Category } from "@/models/category"
import {PeriodBudget} from "@/models/periodBudget";
import {fetchMostRecentPeriodBudgetByCategoryId} from "@/api/PeriodBudgetController";

const ManageBudgets = () => {
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;

    const { user } = useContext(AuthContext)
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            let categories: Category[] = await fetchCategories(user.id);
            let budgets : PeriodBudget[] = [];
            for(let i = 0; i < categories.length; i++){
                budgets.push(await fetchMostRecentPeriodBudgetByCategoryId(user.id, categories[i].id))
            }
            setBudgets(budgets);
            setCategories(categories);
        }

        fetchData();
    })

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
