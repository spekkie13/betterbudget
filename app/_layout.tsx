import {Slot} from "expo-router"
import {AuthProvider} from "@/app/ctx"
import {ThemeProvider} from "@/theme/ThemeContext"

const RootLayout = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default RootLayout
