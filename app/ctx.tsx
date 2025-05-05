import React, { createContext, useState } from 'react'
import { User } from '@/models/user'
import { Team } from '@/models/team'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) // This holds the user state
    const [team, setTeam] = useState(null) // This holds the team state

    const login = (userData : User, teamData : Team) => {
        setUser(userData) // Set the user object on login
        setTeam(teamData) // Set the team object on login
    }

    const logout = () => {
        setUser(null) // Clear the user object on logout
        setTeam(null) // Clear the team object on logout
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

