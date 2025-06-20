import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CategoryCard from "@/app/(tabs)/category/CategoryCard";
import {styles_categorySlotPicker} from "@/styles/tabs/profile/styles_categorySlotPicker";

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
    for (let i = 0; i < selectedCategories.length; i += 2) {
        rows.push(selectedCategories.slice(i, i + 2));
    }

    return (
        <View>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles_categorySlotPicker.cardRow}>
                    {row.map((category, indexInRow) => {
                        const absoluteIndex = rowIndex * 2 + indexInRow;
                        return (
                            <TouchableOpacity
                                key={absoluteIndex}
                                onPress={() => onSlotPress?.(absoluteIndex)}
                                disabled={!onSlotPress}
                                style={styles_categorySlotPicker.touchable}
                            >
                                {category ? (
                                    <CategoryCard category={category}/>
                                ) : (
                                    <Text style={styles_categorySlotPicker.emptyCard}>-</Text>
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
