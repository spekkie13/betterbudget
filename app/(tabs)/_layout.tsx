import {Href, Tabs, useRouter} from "expo-router"
import React, {useMemo, useCallback} from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {Pressable, View} from "react-native"
import {styles_tabLayout} from "@/styles/styles_tabLayout"
import {useThemeContext} from "@/theme/ThemeContext"

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap

export default function TabsLayout() {
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_tabLayout(currentTheme), [currentTheme])
    const router = useRouter()

    const getIcon = (name: string): FontAwesomeIconName => {
        const iconMap: Record<string, FontAwesomeIconName> = {
            home: "home",
            category: "dashboard",
            add: "plus",
            profile: "user",
            settings: "cog",
        }
        return iconMap[name] || "circle"
    }

    const tabRoutes: Record<string, string> = {
        home: '/home',
        category: '/category',
        add: '/add',
        profile: '/profile',
        settings: '/settings',
    }

    const TabButton = useCallback(({route, navigation, props}) => {
        const handlePress = useCallback((e : any) => {
            if (navigation.isFocused()) {
                const path = tabRoutes[route.name]
                if (path) {
                    router.replace({pathname: path} as Href)
                }
            } else {
                props.onPress?.(e)
            }
        }, [navigation, route.name, router, props.onPress]);

        return (
            <Pressable
                {...props}
                onPress={handlePress}
            />
        );
    }, [router, tabRoutes]);

    return (
        <Tabs
            screenOptions={({route, navigation}) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarButton: (props) => (
                    <TabButton route={route} navigation={navigation} props={props}/>
                ),
                tabBarIcon: () => {
                    if (route.name === "add") {
                        return (
                            <View
                                style={styles.expenseView}
                            >
                                <FontAwesome
                                    name="plus"
                                    color={currentTheme.colors.accent}
                                    size={24}
                                />
                            </View>
                        )
                    }
                    return (
                        <FontAwesome
                            name={getIcon(route.name)}
                            color={currentTheme.colors.accent}
                            size={24}
                        />
                    )
                },
                tabBarLabel:
                    route.name.charAt(0).toUpperCase() + route.name.slice(1),
            })}
        >
            <Tabs.Screen name="home"/>
            <Tabs.Screen name="category"/>
            <Tabs.Screen name="add"/>
            <Tabs.Screen name="profile"/>
            <Tabs.Screen name="settings"/>
        </Tabs>
    )
}
