import * as React from "react"
import {useContext, useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native"

import {TextInput} from 'react-native-paper'
import Title from "@/app/components/Text/Title"
import Logo from "@/app/components/UI/General/Logo"
import {supabase} from '@/lib/supabase'
import {styles_login} from '@/styles/styles_login'
import {createNewUser} from "@/api/UserController"
import {AuthContext} from "@/app/ctx"
import {genericFailureMessage} from "@/constants/messageConstants"
import {User} from "@/models/user"
import {Link, router} from "expo-router"
import CustomButton from "@/app/components/UI/General/CustomButton"
import {Team} from "@/models/team"
import {useThemeContext} from "@/theme/ThemeContext"
import {setupNewUserPrefs} from "@/api/PreferenceController";

function Login(): React.JSX.Element {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submissionMessage, setSubmissionMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    const {login} = useContext(AuthContext)

    const { currentTheme } = useThemeContext()
    const styles = styles_login(currentTheme)

    const ShowMessage = (message: string) => {
        setSubmissionMessage(message)
        setMessageVisible(true)
        setTimeout(() => {
            setMessageVisible(false)
        }, 3000)
    }

    const signUp = async (): Promise<void> => {
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
                ShowMessage('Successfully registered user')
                setName('')
                setEmail('')
                setUsername('')
                setPassword('')
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

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Title text={'Better Budget'}/>
                <Logo/>
                <View style={styles.container}>
                    {loading ? (
                        <ActivityIndicator size="small" style={styles.activityIndicator}/>
                    ) : (
                        <View>
                            <View style={styles.messageView}>
                                <Text style={styles.signInText}>Sign up</Text>
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
                                        value={name}
                                        onChangeText={setName}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        label='Name'
                                        placeholderTextColor={currentTheme.colors.textColor}/>
                                    <TextInput
                                        style={styles.input}
                                        value={username}
                                        onChangeText={setUsername}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        label='Username'
                                        placeholderTextColor={currentTheme.colors.textColor}/>
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
                                            onPress={signUp}
                                            style={styles.buttonView}>
                                            <CustomButton text={'Sign up'} color={''} textColor=""/>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                                <View style={styles.signUpView}>
                                    <Link href="/sign-in">
                                        <Text style={styles.signUpText}>Already have an account? Click here to
                                            login</Text>
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
