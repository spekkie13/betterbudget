import {Href, Tabs, useRouter} from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Pressable, View} from "react-native";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import {styles_tabLayout} from "@/styles/styles_tabLayout";

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

export default function TabsLayout() {
    const currentTheme = CustomDarkTheme;
    const styles = styles_tabLayout(currentTheme)
    const router = useRouter();

    const getIcon = (name: string): FontAwesomeIconName => {
        const iconMap: Record<string, FontAwesomeIconName> = {
            home: "home",
            category: "dashboard",
            expense: "plus",
            profile: "user",
            settings: "cog",
        };
        return iconMap[name] || "circle";
    };

    const tabRoutes: Record<string, string> = {
        home: '/home',
        category: '/category',
        expense: '/expense',
        profile: '/profile',
        settings: '/settings',
    };

    return (
        <Tabs
            screenOptions={({route, navigation}) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        onPress={(e) => {
                            if (navigation.isFocused()) {
                                const path = tabRoutes[route.name];
                                if (path) {
                                    router.replace({pathname: path} as Href); // ✅ correct type
                                }
                            } else {
                                props.onPress?.(e);
                            }
                        }}
                    />
                ),
                tabBarIcon: () => {
                    if (route.name === "expense") {
                        return (
                            <View
                                style={styles.expenseView}
                            >
                                <FontAwesome
                                    name="plus"
                                    color={currentTheme.colors.background}
                                    size={24}
                                />
                            </View>
                        );
                    }
                    return (
                        <FontAwesome
                            name={getIcon(route.name)}
                            color={currentTheme.colors.primary}
                            size={24}
                        />
                    );
                },
                tabBarLabel:
                    route.name.charAt(0).toUpperCase() + route.name.slice(1),
            })}
        >
            <Tabs.Screen name="home"/>
            <Tabs.Screen name="category"/>
            <Tabs.Screen name="expense"/>
            <Tabs.Screen name="profile"/>
            <Tabs.Screen name="settings"/>
        </Tabs>
    );
}
