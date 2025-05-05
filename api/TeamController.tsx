import {Team} from '@/models/team'
import {TEAM_BASE_URL} from "@/constants/APIConstants"
import {formRequestNoBody} from "@/api/ApiHelpers";

export async function getTeams() : Promise<Team[]> {
    const request: RequestInfo = formRequestNoBody(TEAM_BASE_URL, 'GET');

    return fetch(request)
        .then(res => res.json())
        .then(data => {
            const teams: Team[] = data.map(item => new Team(item))
            return teams
        })}

export async function getTeamById(teamId: number) : Promise<Team>{
    const TeamData = {
        id: teamId,
        name: 'name'
    }
    return new Team(TeamData)
}

export async function updateTeam(teamId: number) {
    console.log(teamId)
}

export async function deleteTeam(teamId: number) {
    console.log(teamId)
}
