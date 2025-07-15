import * as React from "react"
import { useState } from "react"
import { SafeAreaView} from "react-native-safe-area-context"
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import Logo from "@/app/components/UI/General/Logo"
import { styles_login } from '@/styles/styles_login'
import { Link } from 'expo-router'
import { useAuth } from "@/hooks/useAuth"

import {useThemeContext} from "@/theme/ThemeContext"
import {InputField} from "@/app/components/UI/InputField"
import {MessageBanner} from "@/app/components/Text/MessageBanner";
import Button from "@/app/components/UI/General/Button";

function Login(): React.JSX.Element {
    const { signIn, loading, message } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { currentTheme } = useThemeContext()

    const styles = styles_login(currentTheme)

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
                                <MessageBanner message={message ?? ''}/>
                                <KeyboardAvoidingView behavior={'padding'}>
                                    <InputField
                                        value={email}
                                        onChange={setEmail}
                                        secure={false}
                                        label={'Email'}/>
                                    <InputField
                                        value={password}
                                        onChange={setPassword}
                                        secure={true}
                                        label={'Password'}/>
                                    <View style={styles.signInButtonView}>
                                        <Button
                                            text='Sign in'
                                            onPress={() => signIn(email, password)}
                                            style={styles.buttonView} />
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
