import {Team} from '@/types/models'
import {TEAM_BASE_URL} from "@/constants"
import {formRequestNoBody} from "@/helpers"

export async function getTeamById(teamId: number): Promise<Team> {
    const url = `${TEAM_BASE_URL}?teamId=${teamId}`
    const request: RequestInfo = formRequestNoBody(url, 'GET')

    try {
        const response: Response = await fetch(request)

        if (!response.ok) {
            console.log(`Failed to fetch team: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (!data || !data[0].team.id) {
            console.log("Invalid team data received from API")
        }

        const TeamData = {
            id: data[0].team.id,
            name: data[0].team.name
        }
        return new Team(TeamData)
    } catch (error) {
        console.error("getTeam error:", error)
        throw error
    }
}
