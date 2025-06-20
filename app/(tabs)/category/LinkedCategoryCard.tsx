import CategoryCard from "@/app/(tabs)/category/CategoryCard";
import {Link} from "expo-router";
import {Category} from "@/models/category";

export const LinkedCategoryCard = ({category}: { category: Category }) => (
    <Link href={`/(tabs)/expense/${category.id}/${category.name}`}>
        <CategoryCard category={category}/>
    </Link>
);
