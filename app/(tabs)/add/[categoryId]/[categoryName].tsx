import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import {AuthContext} from '@/app/ctx';
import {categoryNameOther} from '@/constants/messageConstants';
import {styles_expenseMonthSelection} from '@/styles/tabs/expense/styles_expenseMonthSelection';
import CustomDarkTheme from '@/theme/CustomDarkTheme';
import CustomDefaultTheme from '@/theme/CustomDefaultTheme';

import Title from '@/app/components/Text/Title';
import CustomButton from '@/app/components/UI/CustomButton';
import CategoryDeleteModal from '@/app/components/CategoryDeleteModal';
import CategoryEditModal from '@/app/components/CategoryEditModal';

import {ConvertMonthToName} from '@/helpers/DateHelpers';
import {getDistinctPeriods} from '@/api/PeriodController';
import {checkForExistingExpenses} from '@/api/ExpenseController';

import {Period} from '@/models/period';
import {preferenceStore} from "@/hooks/preferenceStore";

const MonthSelection = () => {
    const {user} = useContext(AuthContext);
    const router = useRouter();
    const {categoryId, categoryName} = useLocalSearchParams<{ categoryId: string; categoryName: string }>();

    const [groupedDates, setGroupedDates] = useState<Map<number, number[]>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [deleteMessage, setDeleteMessage] = useState('');

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const colorScheme = preferenceStore.get('colorScheme').stringValue;
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_expenseMonthSelection(currentTheme);

    useEffect(() => {
        const fetchData = async () => {
            const categoryNumId = Number.parseInt(categoryId);
            const periods: Period[] = await getDistinctPeriods(user.id, categoryNumId);
            const grouped = new Map<number, number[]>();

            periods.forEach(({startDate}) => {
                const date = new Date(startDate);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                if (!grouped.has(year)) grouped.set(year, []);
                if (!grouped.get(year)!.includes(month)) {
                    grouped.get(year)!.push(month);
                }
            });

            for (const months of grouped.values()) {
                months.sort((a, b) => b - a);
            }

            setGroupedDates(new Map([...grouped.entries()].sort((a, b) => b[0] - a[0])));

            const expenses = await checkForExistingExpenses(user.id, categoryNumId);
            const message = categoryName === categoryNameOther
                ? 'Unable to delete this category'
                : expenses.length > 0
                    ? 'There are existing expenses in this category, are you sure you want to delete this category?'
                    : 'Are you sure you want to delete this category?';

            setDeleteMessage(message);
            setError(null);
            setLoading(false);
        }

        fetchData();
    }, [categoryId, categoryName, user.id]);

    const handleEdit = () => setEditModalVisible(true);
    const handleDelete = () => setDeleteModalVisible(true);

    const closeAndNavigateBack = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        router.back();
    };

    if (loading) return <ActivityIndicator/>;
    if (error) return <Text style={styles.errorMessage}>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Title text={categoryName}/>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {Array.from(groupedDates.entries()).map(([year, months]) => (
                    <View key={year}>
                        <Text style={styles.headerText}>{year}</Text>
                        {months.map(month => (
                            <Link
                                key={month}
                                href={`/(tabs)/category/${categoryId}/${month}/${year}`}
                                style={styles.monthItem}
                            >
                                <Text style={styles.dateItem}>- {ConvertMonthToName(month)}</Text>
                            </Link>
                        ))}
                    </View>
                ))}

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={handleEdit} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="pencil" size={20} style={styles.icon}/>
                            <Text style={styles.text}>Edit Category</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDelete} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="trash" size={20} style={styles.icon}/>
                            <Text style={styles.text}>Delete</Text>
                        </View>
                    </TouchableOpacity>

                    <CategoryDeleteModal
                        visible={deleteModalVisible}
                        onClose={closeAndNavigateBack}
                        categoryId={categoryId}
                        message={deleteMessage}
                    />

                    <CategoryEditModal
                        visible={editModalVisible}
                        onClose={closeAndNavigateBack}
                        categoryId={categoryId}
                    />
                </View>

                <Link href="/(tabs)/category">
                    <CustomButton text="Back" color="" textColor=""/>
                </Link>
            </ScrollView>
        </View>
    );
};

export default MonthSelection;
