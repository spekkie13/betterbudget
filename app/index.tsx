import {Redirect} from 'expo-router'
import {AuthContext} from "@/app/ctx"
import {useContext, useEffect, useState} from "react"
import {useCustomFonts} from "@/hooks"

const StartPage = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    useEffect(() => {
        const loadFonts = async () => {
            await useCustomFonts()
            setFontsLoaded(true)
        }

        loadFonts()
    }, [])

    const {user} = useContext(AuthContext)
    const href = user ? "/(tabs)/home" : "/sign-in"
    return <Redirect href={href}/>
}

export default StartPage
