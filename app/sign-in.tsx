import * as React from "react"
import {useCallback, useMemo, useState} from "react"
import { SafeAreaView} from "react-native-safe-area-context"
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import { Button, CustomLink, InputField, Logo, MessageBanner } from '@/app/components/General'
import { styles_login } from '@/styles/styles_login'
import {useRouter} from 'expo-router'
import { useAuth } from "@/hooks"
import {useThemeContext} from "@/theme/ThemeContext"

function Login(): React.JSX.Element {
    const { status, signIn, loading, message } = useAuth()
    const [loginState, setLoginState] = useState({
        email: '',
        password: ''
    })

    const handleUpdateField = useCallback((fieldName: string) => (value: string) => {
        setLoginState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }, [])

    const router = useRouter()

    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_login(currentTheme), [currentTheme])

    const handleGoToSignUp = useCallback(() => {
        router.replace('/sign-up')
    }, [router])

    const handleSignIn = useCallback(async () => {
        await signIn(loginState.email, loginState.password)
    }, [loginState])

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
                                <MessageBanner message={message ?? ''} type={status === true ? 'success' : 'error'}/>
                                <KeyboardAvoidingView behavior={'padding'}>
                                    <InputField
                                        value={loginState.email}
                                        onChange={handleUpdateField('email')}
                                        secure={false}
                                        label={'Email'}
                                    />
                                    <InputField
                                        value={loginState.password}
                                        onChange={handleUpdateField('password')}
                                        secure={true}
                                        label={'Password'}
                                    />
                                    <View style={styles.signInButtonView}>
                                        <Button
                                            text='Sign in'
                                            onPress={handleSignIn}
                                            style={styles.buttonView} />
                                    </View>
                                </KeyboardAvoidingView>
                                <View style={styles.signUpView}>
                                    <CustomLink
                                        text="Don't have an account yet? Click here to sign up"
                                        onPress={handleGoToSignUp}
                                        style={styles.signUpText}/>
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
