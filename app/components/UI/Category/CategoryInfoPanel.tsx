import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { styles_categoryInfoPanel } from '@/styles/tabs/category/styles_categoryInfoPanel'
import { useThemeContext } from '@/theme/ThemeContext'
import { Category } from '@/types/models'
import {SubTitle} from "@/app/components/General";
import CategoriesList from "@/app/components/UI/Category/CategoriesList";

interface CategoryInfoPanelProps {
    categories: Category[]
}

const CategoryInfoPanel: React.FC<CategoryInfoPanelProps> = ({ categories }) => {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_categoryInfoPanel(currentTheme), [currentTheme])

    const title: string = 'Top ' + categories.length + ' categories'

    return (
        <View style={styles.container}>
            <SubTitle text={title}/>
            <View style={styles.categoryView}>
                {categories?.length === 0 ? (
                    <Text style={styles.notFoundText}>
                        No categories to display.
                    </Text>
                ) : (
                    <CategoriesList categories={categories} max={categories.length}/>
                )}
            </View>
        </View>
    )
}

export default CategoryInfoPanel
