import {AuthContext} from "@/app/ctx";
import {useContext, useEffect, useState} from "react";
import {determineSpendingRoom} from "@/api";
import {useRouter} from "expo-router";

export function useSpendingRoom() {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [spendingRoom, setSpendingRoom] = useState(0)
    const username = user?.username

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (!user) {
                router.replace('/sign-in')
                return
            }
            try {
                const sum: number = await determineSpendingRoom(user.id)
                setSpendingRoom(sum)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    return {
        loading,
        error,
        spendingRoom,
        username
    }
}
