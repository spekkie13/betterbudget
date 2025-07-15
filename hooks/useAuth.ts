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
import {getUserPreferences, updateAllUserPreferences} from "@/api/PreferenceController"
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
    async function signUp(email: string, password: string, name: string, username: string) {
        setLoading(true);
        if (!email || !password) {
            showMessage(errorLoginMessage);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error || !data.user) {
                if (error.status === 429){
                    showMessage('Too many requests, try again later...')
                }else{
                    showMessage(errorLoginMessage);
                }
                return;
            }

            const userData = {
                id: 0,
                email: data.user.email,
                username: username,
                name: name,
                teamId: 0,
            }
            const user = await createNewUser(userData);

            login(user, Team.empty())
        } catch (err) {
            console.error('Error while signing up', err);
            showMessage(genericFailureMessage);
        } finally {
            setLoading(false);
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
