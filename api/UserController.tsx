import { User } from "@/models/user"
import { USER_BASE_URL } from "@/constants/APIConstants"
import { formRequestNoBody, formRequestWithBody } from "@/api/ApiHelpers"

export async function getUser(email: string): Promise<User> {
    const url = `${USER_BASE_URL}?email=${encodeURIComponent(email)}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)

        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (!data || !data.email || !data.id) {
            throw new Error("Invalid user data received from API")
        }

        const userData = {
            email: data.email,
            id: data.id,
            name: data.name,
            username: data.username,
            teamId: data.teamId,
        }

        return new User(userData)
    } catch (error) {
        console.error("getUser error:", error)
        throw error
    }
}

export async function insertUser(user: User): Promise<boolean> {
    const request: RequestInfo = formRequestWithBody(USER_BASE_URL, 'POST', user)

    try {
        const response: Response = await fetch(request)
        return response.ok
    } catch (error) {
        console.error("insertUser error:", error)
        return false
    }
}
