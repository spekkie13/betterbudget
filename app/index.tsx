import { Redirect } from 'expo-router'
import {AuthContext} from "@/app/ctx";
import {useContext} from "react";

const StartPage = () => {
    const { user } = useContext(AuthContext)

    const href = user ? "/(tabs)/home" : "/sign-in"
//    const href = "/(tabs)/home"

    return <Redirect href={href}/>
}

export default StartPage
