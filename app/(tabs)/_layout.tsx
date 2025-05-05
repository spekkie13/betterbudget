import {Tabs} from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useColorScheme, View} from "react-native";
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";

export default () => {
    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme

    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: currentTheme.colors.background,
                    borderRadius: 15,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: currentTheme.colors.primary,
                    height: 50
                }
            }}>
            <Tabs.Screen name="home" options={{tabBarLabel: 'Home', tabBarIcon: () => <FontAwesome name="home" color={currentTheme.colors.primary} size={24} /> }} />
            <Tabs.Screen name='category' options={{tabBarLabel: 'Overview', tabBarIcon: () => <FontAwesome name="dashboard" color={currentTheme.colors.primary} size={24} /> }}/>
            <Tabs.Screen name='expense' options={{tabBarLabel: 'Add', tabBarIcon: () => (
                        <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 25,
                            backgroundColor: currentTheme.colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <FontAwesome name={'plus'} color={currentTheme.colors.background} size={24} />
                        </View>
                    )}}/>
            <Tabs.Screen name='profile' options={{tabBarLabel: 'Profile', tabBarIcon: () => <FontAwesome name="user" color={currentTheme.colors.primary} size={24} /> }}/>
            <Tabs.Screen name='settings' options={{tabBarLabel: 'Settings', tabBarIcon: () => <FontAwesome name="cog" color={currentTheme.colors.primary} size={24} /> }}/>
        </Tabs>
    )
}
