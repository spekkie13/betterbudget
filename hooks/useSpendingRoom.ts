import {AuthContext} from "@/app/ctx";
import {useContext, useEffect, useState} from "react";
import {determineSpendingRoom} from "@/api";
import {useRouter} from "expo-router";

export function useSpendingRoom(refreshTrigger?: number) {
    const { userState } = useContext(AuthContext)
    const user = userState.user
    const userId = user?.id

    const router = useRouter()

    const [spendingRoomState, setSpendingRoomState] = useState({
        loading: false,
        error: undefined as string | undefined,
        spendingRoom: 0,
    })

    const username = user?.username

    useEffect(() => {
        const fetchData = async () => {
            setSpendingRoomState(prev => ({
                ...prev,
                loading: true
            }))
            if (!user) {
                router.replace('/sign-in')
                return
            }
            try {
                const sum: number = await determineSpendingRoom(user.id)
                setSpendingRoomState(prev => ({
                    ...prev,
                    spendingRoom: sum
                }))
            } catch (err) {
                console.log(err)
                setSpendingRoomState(prev => ({
                    ...prev,
                    error: err.message,
                }))
            } finally {
                setSpendingRoomState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
        }

        fetchData()
    }, [userId, refreshTrigger])

    return {
        spendingRoomState,
        username
    }
}
