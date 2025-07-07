import {Slot} from "expo-router";
import {AuthProvider} from "@/app/ctx";
import {ThemeProvider} from "@/theme/ThemeContext";

const RootLayout = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Slot/>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default RootLayout
