import {useCallback, useContext, useState} from 'react'
import {useRouter} from "expo-router"
import {AuthContext} from '@/app/ctx'
import { useThemeContext } from '@/theme/ThemeContext'
import {supabase} from "@/lib/supabase"
import {errorLoginMessage, genericFailureMessage} from "@/constants"
import { createNewUser, getUser, getTeamById, getUserPreferences, setupNewUserPrefs, updateAllUserPreferences } from '@/api'
import {Team, User} from "@/types/models"
import {preferenceStore} from "@/hooks"

export function useAuth() {
    const { login, logout } = useContext(AuthContext)
    const { refreshTheme } = useThemeContext()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>('')
    const [status, setStatus] = useState<boolean>(true)

    function showMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    }

    // ✅ SIGN IN
    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
        if (!email || !password) {
            setStatus(false)
            showMessage(errorLoginMessage);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error || !data.user) {
                setStatus(false)
                showMessage(error.message)
                setLoading(false);
                return;
            }

            const user: User = await getUser(email);
            const team: Team = user.teamId ? await getTeamById(user.teamId) : Team.empty();
            login(user, team);

            preferenceStore.load(await getUserPreferences(user.id));
            refreshTheme();
            router.replace('/home');
        } catch (err) {
            console.error('Error while signing in', err);
            setStatus(false)
            showMessage(genericFailureMessage);
        } finally {
            setLoading(false);
        }
    }, [router, login, refreshTheme])

    // ✅ SIGN UP
    const signUp = useCallback(async (name: string, username: string, email: string, password: string): Promise<void> => {
        setLoading(true)
        if (!name || !username || !email || !password) {
            setStatus(false)
            showMessage(errorLoginMessage)
            setLoading(false)
            return
        }
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                setStatus(false)
                showMessage('Registration failed: ' + error.message)
                setLoading(false)
                return
            }

            const user: User = User.empty()
            user.name = name
            user.username = username
            user.email = data.user.email

            const team: Team = Team.empty()
            const dbUser : User = await createNewUser(user)

            if (dbUser.name !== '') {
                login(dbUser, team)
                await setupNewUserPrefs(dbUser.id)
                setStatus(true)
                showMessage('Successfully registered user')
                router.replace('/sign-in')
            } else {
                setStatus(false)
                showMessage(genericFailureMessage)
                setLoading(false)
            }
        } catch (e: any) {
            setStatus(false)
            showMessage(genericFailureMessage)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [router, signIn, refreshTheme])

    // ✅ LOGOUT
    const signOut = useCallback(async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            await updateAllUserPreferences(preferenceStore.getAll());
            preferenceStore.clear();
            await logout();
            router.replace('/sign-in');
        } catch (err) {
            setStatus(false)
            showMessage(genericFailureMessage);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [router, refreshTheme])

    return {
        status,
        signIn,
        signUp,
        signOut,
        loading,
        message,
    }
}
