import React from "react";
import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack initialRouteName="index" screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="ManageCategories" options={{headerShown: false}}/>
            <Stack.Screen name="ManageBudgets" options={{headerShown: false}}/>
        </Stack>
    )
}

export default StackLayout
