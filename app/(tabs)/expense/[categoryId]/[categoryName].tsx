import { ActivityIndicator, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { DateObj } from '@/models/dateObj';
import { FetchDistinctDates } from '@/api/DateController';
import { ConvertDateToMonthName } from '@/helpers/DateHelpers';
import React, { useContext, useEffect, useState } from 'react';
import { categoryNameOther } from '@/constants/OtherConstants';
import Title from '@/app/general/Title';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CategoryDeleteModal from '@/app/(tabs)/category/CategoryDeleteModal';
import { checkForExistingExpenses } from '@/api/ExpenseController';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { styles_expenseMonthSelection } from '@/styles/styles_expenseMonthSelection';
import CustomDarkTheme from '@/theme/CustomDarkTheme';
import CustomDefaultTheme from '@/theme/CustomDefaultTheme';
import { AuthContext } from '@/app/ctx';
import CustomButton from '@/app/general/CustomButton';

const MonthSelection = () => {
    const [dates, setDates] = useState<DateObj[]>([]);
    const [groupedDates, setGroupedDates] = useState<Map<number, number[]>>(new Map());
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const { categoryId, categoryName } = useLocalSearchParams<{ categoryId: string; categoryName: string; }>();

    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;
    const styles = styles_expenseMonthSelection(currentTheme);

    useEffect(() => {
        FetchDistinctDates(user.id, Number.parseInt(categoryId)).then((data: DateObj[]): void => {
            const grouped = new Map<number, Set<number>>();

            // Group dates by year and month
            data.forEach(({ year, month }) => {
                if (!grouped.has(year)) {
                    grouped.set(year, new Set());
                }
                grouped.get(year)!.add(month);
            });

            // Convert to a sorted Map
            const sortedGrouped = new Map(
                Array.from(grouped.entries())
                    .sort(([yearA], [yearB]) => yearB - yearA) // Sort years descending
                    .map(([year, months]) => [
                        year,
                        Array.from(months).sort((a, b) => b - a), // Sort months descending
                    ])
            );

            setGroupedDates(sortedGrouped);
        });

        const fetchDeleteMessage = async () => {
            try {
                let message: string;
                const existingExpenses = await checkForExistingExpenses(user.id, Number.parseInt(categoryId));

                if (categoryName === categoryNameOther) {
                    message = 'Unable to delete this home';
                } else if (existingExpenses.length > 0) {
                    message =
                        'There are existing expenses in this home, are you sure you want to delete this home?';
                } else {
                    message = 'Are you sure you want to delete this home?';
                }
                setDeleteMessage(message);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeleteMessage();
    }, []);


    function Edit() {
        setEditModalVisible(true);
    }

    function Delete() {
        setDeleteModalVisible(true);
    }

    if (loading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Title text={categoryName} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {Array.from(groupedDates.entries()).map(([year, months]) => (
                    <View key={year}>
                        <Text style={styles.headerText}>{year}</Text>
                        {months.map((month) => (
                            <Link key={month} href={`/(tabs)/category/${categoryId}/0/${month}/${year}`}>
                                <Text style={styles.dateItem}>
                                    - {ConvertDateToMonthName(new DateObj({ id: 0, year: year, month: month - 1, day: 1 }))}
                                </Text>
                            </Link>
                        ))}
                    </View>
                ))}
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={Edit} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="pencil" size={20} style={styles.icon} />
                            <Text style={styles.text}>Edit Category</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Delete} style={styles.touchable}>
                        <View style={styles.view}>
                            <FontAwesome name="trash" size={20} style={styles.icon} />
                            <Text style={styles.text}>Delete</Text>
                        </View>
                    </TouchableOpacity>

                    <CategoryDeleteModal
                        onClose={() => {
                            setDeleteModalVisible(false);
                            router.back();
                        }}
                        visible={deleteModalVisible}
                        categoryId={categoryId}
                        message={deleteMessage}
                    />
                </View>
                <Link href="/(tabs)/category">
                    <CustomButton text="Back" color="" />
                </Link>
            </ScrollView>
        </View>
    );
};

export default MonthSelection;
