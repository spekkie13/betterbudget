import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import CustomDarkTheme from "@/theme/CustomDarkTheme"
import CustomDefaultTheme from "@/theme/CustomDefaultTheme"
import { preferenceStore } from "@/hooks/preferenceStore"

interface ThemeContextType {
    theme: "light" | "dark"
    currentTheme: typeof CustomDarkTheme | typeof CustomDefaultTheme
    setTheme: (theme: "light" | "dark") => void
    refreshTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<"light" | "dark">("light")

    useEffect(() => {
        const stored = preferenceStore.get("colorScheme")?.stringValue
        if (stored === "dark" || stored === "light") {
            setThemeState(stored)
            console.log('Set theme to:', stored)
        }
    }, [])

    const refreshTheme = () => {
        const stored = preferenceStore.get("colorScheme")?.stringValue
        if (stored === "dark" || stored === "light") {
            setThemeState(stored)
        }
    }

    const setTheme = (newTheme: "light" | "dark") => {
        const themePref = preferenceStore.get("colorScheme")
        themePref.stringValue = newTheme
        preferenceStore.set(themePref)
        setThemeState(newTheme)
    }

    const currentTheme = theme === "dark" ? CustomDarkTheme : CustomDefaultTheme

    return (
        <ThemeContext.Provider value={{ theme, currentTheme, setTheme, refreshTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProvider")
    }
    return context
}
