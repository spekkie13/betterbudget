import React from "react";
import {Stack} from "expo-router";

const StackLayout = () => {
    return(
        <Stack initialRouteName="index" screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default StackLayout
