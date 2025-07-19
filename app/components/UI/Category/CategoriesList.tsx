import React, {useMemo} from "react"
import {View} from "react-native"
import {LinkedCategoryCard} from "@/app/components/UI/Category/LinkedCategoryCard"
import {styles_categoriesList} from "@/styles/tabs/category/styles_categoriesList"
import {CategoryListProps} from "@/types/props";

const CategoryList: React.FC<CategoryListProps> = ({categories, max, theme} : CategoryListProps) => {
    const categoriesToRender = useMemo(() => {
        return max ? categories.slice(0, max).sort() : categories;
    }, [categories, max]);
    const pairs: React.JSX.Element[] = []

    for (let i = 0; i < categoriesToRender.length; i += 2) {
        pairs.push(
            <View
                key={i}
                style={styles_categoriesList.categoriesView}
            >
                <View style={styles_categoriesList.cardView}>
                    <LinkedCategoryCard category={categoriesToRender[i]} theme={theme}/>
                </View>
                {categoriesToRender[i + 1] && (
                    <View style={styles_categoriesList.cardView}>
                        <LinkedCategoryCard category={categoriesToRender[i + 1]} theme={theme}/>
                    </View>
                )}
            </View>
        )
    }

    return <View>{pairs}</View>
}

export default CategoryList
