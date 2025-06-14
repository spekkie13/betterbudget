import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CategoryCard from "@/app/(tabs)/category/CategoryCard";

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

const CategorySlotPicker: React.FC<CategorySlotPickerProps> = ({ selectedCategories, onSlotPress }) => {
    // Group categories into rows of 2
    const rows: (Category | null)[][] = [];
    for (let i = 0; i < selectedCategories.length; i += 2) {
        rows.push(selectedCategories.slice(i, i + 2));
    }

    return (
        <View>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                    {row.map((category, indexInRow) => {
                        const absoluteIndex = rowIndex * 2 + indexInRow;
                        return (
                            <TouchableOpacity
                                key={absoluteIndex}
                                onPress={() => onSlotPress?.(absoluteIndex)}
                                disabled={!onSlotPress}
                                style={{
                                    borderWidth: 2,
                                    width: 160,
                                    height: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    marginHorizontal: 5,
                                }}
                            >
                                {category ? (
                                    <CategoryCard category={category} />
                                ) : (
                                    <Text style={{ fontSize: 24, color: '#888' }}>-</Text>
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
