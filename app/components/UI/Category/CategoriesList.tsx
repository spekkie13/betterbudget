import React, {useMemo} from "react"
import {View} from "react-native"
import {LinkedCategoryCard} from "@/app/components/UI/Category/LinkedCategoryCard"
import {styles_categoriesList} from "@/styles/tabs/category/styles_categoriesList"
import {CategoryListProps} from "@/types/props";

const CategoryList: React.FC<CategoryListProps> = ({categories, max} : CategoryListProps) => {
    const categoriesToRender = useMemo(() =>
        max ? categories.slice(0, max).sort() : categories,
        [categories, max]
    );

    const pairs = useMemo(() => {
        const pairsArray: React.JSX.Element[] = [];
        for (let i = 0; i < categoriesToRender.length; i += 2) {
            pairsArray.push(
                <View key={i} style={styles_categoriesList.categoriesView}>
                    <View style={styles_categoriesList.cardView}>
                        <LinkedCategoryCard category={categoriesToRender[i]}/>
                    </View>
                    {categoriesToRender[i + 1] && (
                        <View style={styles_categoriesList.cardView}>
                            <LinkedCategoryCard category={categoriesToRender[i + 1]}/>
                        </View>
                    )}
                </View>
            );
        }
        return pairsArray;
    }, [categoriesToRender]);

    return <View>{pairs}</View>
}

export default CategoryList
