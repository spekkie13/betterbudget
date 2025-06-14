import React from "react";
import { View } from "react-native";
import { Category } from "@/models/category";
import {LinkedCategoryCard} from "@/app/(tabs)/category/LinkedCategoryCard";

interface CategoryListProps {
    categories: Category[];
    max?: number; // optional limit
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, max }) => {
    const categoriesToRender = max ? categories.slice(0, max) : categories;

    const pairs: React.JSX.Element[] = [];
    for (let i = 0; i < categoriesToRender.length; i += 2) {
        pairs.push(
            <View
                key={i}
                style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}
            >
                <View style={{ flex: 1, marginRight: 5 }}>
                    <LinkedCategoryCard category={categoriesToRender[i]} />
                </View>
                {categoriesToRender[i + 1] && (
                    <View style={{ flex: 1 }}>
                        <LinkedCategoryCard category={categoriesToRender[i + 1]} />
                    </View>
                )}
            </View>
        );
    }

    return <View>{pairs}</View>;
};

export default CategoryList;
