import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CategoryCard from "@/app/(tabs)/category/CategoryCard";
import {styles_categorySlotPicker} from "@/styles/tabs/profile/styles_categorySlotPicker";
import {preferenceStore} from "@/hooks/preferenceStore";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

export interface Category {
    id: number;
    name: string;
    color: string;
    icon: string;
    userId: number;
}

interface CategorySlotPickerProps {
    selectedCategories: (Category | null)[];
    onSlotPress?: (index: number) => void;
}

const CategorySlotPicker: React.FC<CategorySlotPickerProps> = ({selectedCategories, onSlotPress}) => {
    const rows: (Category | null)[][] = [];
    const colorScheme = preferenceStore.get('colorScheme').stringValue;
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_categorySlotPicker(currentTheme)


    for (let i = 0; i < selectedCategories.length; i += 2) {
        rows.push(selectedCategories.slice(i, i + 2));
    }

    return (
        <View>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.cardRow}>
                    {row.map((category, indexInRow) => {
                        const absoluteIndex = rowIndex * 2 + indexInRow;
                        return (
                            <TouchableOpacity
                                key={absoluteIndex}
                                onPress={() => onSlotPress?.(absoluteIndex)}
                                disabled={!onSlotPress}
                                style={styles.touchable}
                            >
                                {category ? (
                                    <CategoryCard category={category}/>
                                ) : (
                                    <Text style={styles.emptyCard}>-</Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

export default CategorySlotPicker;
