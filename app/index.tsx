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

    const {userState} = useContext(AuthContext)
    const href = userState?.user ? "/(tabs)/home" : "/sign-in"
    return <Redirect href={href}/>
}

export default StartPage
