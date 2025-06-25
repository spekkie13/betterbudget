import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/models/user';
import { Team } from '@/models/team';
import { getUser } from '@/api/UserController';

interface AuthContextType {
    user: User | null;
    team: Team | null;
    login: (userData: User, teamData: Team) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [team, setTeam] = useState<Team | null>(null);

    const login = (userData: User, teamData: Team) => {
        setUser(userData);
        setTeam(teamData);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setTeam(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session;

            if (session?.user?.email) {
                try {
                    const userData = await getUser(session.user.email);
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to restore user from Supabase session:', error);
                }
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
                setTeam(null);
            }

            if (event === 'SIGNED_IN' && session?.user?.email) {
                try {
                    const userData = await getUser(session.user.email);
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to load user on sign in:', error);
                }
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, team, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
