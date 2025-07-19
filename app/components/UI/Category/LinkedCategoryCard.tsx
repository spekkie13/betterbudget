import CategoryCard from "@/app/components/UI/Category/CategoryCard"
import {Link} from "expo-router"
import {Category} from "@/types/models"
import {useMemo} from "react";

// Na
export const LinkedCategoryCard = ({category}: { category: Category }) => {
    const href = useMemo(() =>
        `/(tabs)/add/${category.id}/${category.name}`,
        [category.id, category.name]
    )

    return (
        <Link href={href}>
            <CategoryCard category={category}/>
        </Link>
    )
}
