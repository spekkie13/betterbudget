import {User} from "@/models/user"
import {USER_BASE_URL} from "@/constants/APIConstants"
import {formRequestNoBody, formRequestWithBody} from "@/api/ApiHelpers";

export async function getUser(email: string): Promise<User>{
    const url = `${USER_BASE_URL}/${encodeURIComponent(email)}`
    const request : RequestInfo = formRequestNoBody(url, 'GET')

    const response : Response = await fetch(request)
    const data = await response.json()
    const userData = {
        email: data.email,
        id: data.id,
        name: data.name,
        username: data.username,
        teamId: data.teamId,
    }

    return new User(userData)
}

export async function insertUser(user: User): Promise<boolean> {
    const request : RequestInfo = formRequestWithBody(USER_BASE_URL, 'POST', user)
    const response : Response = await fetch(request)
    return response.status === 200;
}
