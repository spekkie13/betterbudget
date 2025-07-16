import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { CustomDarkTheme, CustomLightTheme } from "@/theme/Theme"
import { preferenceStore } from "@/hooks"

interface ThemeContextType {
    theme: "light" | "dark"
    currentTheme: typeof CustomDarkTheme | typeof CustomLightTheme
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

    const currentTheme = theme === "dark" ? CustomDarkTheme : CustomLightTheme

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
