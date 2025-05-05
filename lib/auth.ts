import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabase';

const redirectUri = AuthSession.makeRedirectUri({
    path: '/auth/callback',
    scheme: 'expo', // Must match app.json
});

export async function signInWithGoogle(): Promise<void> {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUri,
        },
    });

    if (error) {
        console.error('Google sign-in error:', error.message);
        throw error;
    }

    // The user will now be redirected to Google, then back to the app
}
