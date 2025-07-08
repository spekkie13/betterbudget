import CategoryCard from "@/app/components/UI/Category/CategoryCard"
import {Link} from "expo-router"
import {Category} from "@/models/category"

export const LinkedCategoryCard = ({category, theme}: { category: Category, theme: any }) => (
    <Link href={`/(tabs)/add/${category.id}/${category.name}`}>
        <CategoryCard category={category} theme={theme}/>
    </Link>
)
