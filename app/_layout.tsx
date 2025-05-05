import {Slot} from "expo-router";
import {AuthProvider} from "@/app/ctx";

const RootLayout = () => {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}

export default RootLayout
