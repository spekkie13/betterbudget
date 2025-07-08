import * as React from "react"
import { useContext, useState } from "react"
import { SafeAreaView} from "react-native-safe-area-context"
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper"
import Logo from "@/app/components/UI/General/Logo"
import { styles_login } from '@/styles/styles_login'
import { getUser } from "@/api/UserController"
import { AuthContext } from "@/app/ctx"
import { Link, router } from 'expo-router'
import { errorLoginMessage, genericFailureMessage } from "@/constants/messageConstants"
import CustomButton from "@/app/components/UI/General/CustomButton"
import { supabase } from "@/lib/supabase"
import { getTeamById } from "@/api/TeamController"
import { getUserPreferences } from "@/api/PreferenceController"
import { preferenceStore } from "@/hooks/preferenceStore"

import { Team } from "@/models/team"
import { User } from "@/models/user"
import {useThemeContext} from "@/theme/ThemeContext"
import {UserPreference} from "@/models/userPreference"

function Login(): React.JSX.Element {
    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submissionMessage, setSubmissionMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const { currentTheme, refreshTheme } = useThemeContext()

    const styles = styles_login(currentTheme)

    const signIn = async (): Promise<void> => {
        setLoading(true)
        if (!password || !email) {
            setLoading(false)
            ShowMessage(errorLoginMessage)
            return
        }

        try {
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password,
            })

            if (error || !data.user) {
                ShowMessage(errorLoginMessage)
                return
            }

            const user : User = await getUser(data.user.email)
            const team : Team = await getTeamById(user.teamId)
            login(user, team)
            const preferences : UserPreference[] = await getUserPreferences(user.id)
            preferenceStore.load(preferences)
            refreshTheme()
            router.replace("/home/")
        } catch (error) {
            console.log("Something went wrong logging in: ", error)
            alert(genericFailureMessage)
        } finally {
            setLoading(false)
        }
    }

    const ShowMessage = (message: string) => {
        setSubmissionMessage(message)
        setMessageVisible(true)
        setTimeout(() => {
            setMessageVisible(false)
        }, 3000)
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Logo/>
                <View style={styles.container}>
                    {loading ? (
                        <ActivityIndicator size="small" style={styles.activityIndicator}/>
                    ) : (
                        <View>
                            <View style={styles.messageView}>
                                <Text style={styles.signInText}>Sign in</Text>
                                {messageVisible && (
                                    <View>
                                        <Text style={styles.submissionText}>
                                            {submissionMessage}
                                        </Text>
                                    </View>
                                )}
                                <KeyboardAvoidingView behavior={'padding'}>
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        label='Email'
                                        placeholderTextColor={currentTheme.colors.textColor}/>
                                    <TextInput
                                        style={styles.input}
                                        value={password}
                                        onChangeText={setPassword}
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        label='Password'
                                        placeholderTextColor={currentTheme.colors.textColor}/>
                                    <View style={styles.signInButtonView}>
                                        <TouchableOpacity
                                            onPress={signIn}
                                            style={styles.buttonView}>
                                            <CustomButton text={'Sign in'} color={''} textColor=""/>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                                <View style={styles.signUpView}>
                                    <Link href="/sign-up">
                                        <Text style={styles.signUpText}>Don't have an account yet? Click here to sign up</Text>
                                    </Link>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
