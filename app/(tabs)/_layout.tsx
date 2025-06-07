import {Href, Tabs, useRouter} from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme, View, Pressable } from "react-native";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const currentTheme =
        colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;

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
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: currentTheme.colors.background,
                    borderRadius: 15,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: currentTheme.colors.primary,
                    height: 50,
                },
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        onPress={(e) => {
                            if (navigation.isFocused()) {
                                const path = tabRoutes[route.name];
                                if (path) {
                                    router.replace({ pathname: path } as Href); // ✅ correct type
                                }
                            } else {
                                props.onPress?.(e);
                            }
                        }}
                    />
                ),
                tabBarIcon: ({ focused }) => {
                    if (route.name === "expense") {
                        return (
                            <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 25,
                                    backgroundColor: currentTheme.colors.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
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
            <Tabs.Screen name="home" />
            <Tabs.Screen name="category" />
            <Tabs.Screen name="expense" />
            <Tabs.Screen name="profile" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}
