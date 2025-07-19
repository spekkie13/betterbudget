import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Team, User } from '@/types/models'
import { getUser } from '@/api'

interface AuthContextType {
    userState: {
        user: User | null
        team: Team | null
    }
    login: (userData: User, teamData: Team) => void
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userState, setUserState] = useState({
        user: null as User | null,
        team: null as Team | null,
    })

    const login = (userData: User, teamData: Team) => {
        setUserState({
            user: userData,
            team: teamData,
        })
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUserState({
            user: null,
            team: null,
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.auth.getSession()
            const session = data.session

            if (session?.user?.email) {
                try {
                    const userData = await getUser(session.user.email)
                    setUserState({
                        ...userState,
                        user: userData,
                    })
                } catch (error) {
                    console.error('Failed to restore user from Supabase session:', error)
                }
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setUserState({
                        user: null,
                        team: null,
                    })
                }

                if (event === 'SIGNED_IN' && session?.user?.email) {
                    try {
                        const userData = await getUser(session.user.email)
                        setUserState({
                            ...userState,
                            user: userData,
                        })
                    } catch (error) {
                        console.error('Failed to load user on sign in:', error)
                    }
                }
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ userState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
