import {useContext, useState} from 'react'
import {AuthContext} from '@/app/ctx'
import { useThemeContext } from '@/theme/ThemeContext'
import {supabase} from "@/lib/supabase"
import {errorLoginMessage, genericFailureMessage} from "@/constants/messageConstants"
import {createNewUser, getUser} from "@/api/UserController"
import {User} from "@/models/user"
import {Team} from "@/models/team"
import {getTeamById} from "@/api/TeamController"
import {preferenceStore} from "@/hooks/preferenceStore"
import {getUserPreferences, setupNewUserPrefs, updateAllUserPreferences} from "@/api/PreferenceController"
import {useRouter} from "expo-router"

export function useAuth() {
    const { login, logout } = useContext(AuthContext)
    const { refreshTheme } = useThemeContext()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>('')

    function showMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    }

    // ✅ SIGN IN
    async function signIn(email: string, password: string) {
        setLoading(true);
        if (!email || !password) {
            showMessage(errorLoginMessage);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error || !data.user) {
                showMessage(errorLoginMessage);
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
            showMessage(genericFailureMessage);
        } finally {
            setLoading(false);
        }
    }

    // ✅ SIGN UP
    const signUp = async (name: string, username: string, email: string, password: string): Promise<void> => {
        setLoading(true)
        if (!name || !username || !email || !password) {
            setLoading(false)
            return
        }
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                alert('Registration failed: ' + error.message)
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
                showMessage('Successfully registered user')
                router.replace('/sign-in')
            } else {
                alert(genericFailureMessage)
            }
        } catch (e: any) {
            console.error(e)
            alert('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    // ✅ LOGOUT
    async function signOut() {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            await updateAllUserPreferences(preferenceStore.getAll());
            preferenceStore.clear();
            await logout();
            router.replace('/sign-in');
        } catch (err) {
            console.error('Error while signing out', err);
            showMessage(genericFailureMessage);
        } finally {
            setLoading(false);
        }
    }

    return {
        signIn,
        signUp,
        signOut,
        loading,
        message,
    }
}
