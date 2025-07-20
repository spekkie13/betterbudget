import React, {useCallback, useMemo, useState} from "react"
import {useRouter} from "expo-router"
import {SafeAreaView} from "react-native-safe-area-context"
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import { Button, CustomLink, InputField, Logo, MessageBanner, Title } from '@/app/components/General'
import {styles_login} from '@/styles/styles_login'
import {useThemeContext} from "@/theme/ThemeContext"
import {useAuth} from "@/hooks"

function Login(): React.JSX.Element {
    const { status, message, loading, signUp } = useAuth()
    const { currentTheme } = useThemeContext()
    const styles = useMemo(() => styles_login(currentTheme), [currentTheme])

    const router = useRouter()
    const [signUpState, setSignUpState] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const handleUpdateField = useCallback((fieldName: string) => (value: string) => {
        setSignUpState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }, [])

    const handleGoToSignIn = useCallback(() => {
        router.replace('/sign-in')
    }, [])

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

                                <MessageBanner message={message ?? ''} type={status === true ? 'success' : 'error'}/>
                                <KeyboardAvoidingView behavior={'padding'}>
                                    <InputField
                                        value={signUpState.name}
                                        onChange={handleUpdateField('name')}
                                        label={'Name'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={signUpState.username}
                                        onChange={handleUpdateField('username')}
                                        label={'Username'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={signUpState.email}
                                        onChange={handleUpdateField('email')}
                                        label={'Email'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={signUpState.password}
                                        onChange={handleUpdateField('password')}
                                        label={'Password'}
                                        secure={true}
                                    />
                                    <View style={styles.signInButtonView}>
                                        <Button
                                            text='Sign Up'
                                            onPress={async () => {
                                                await signUp(signUpState.name, signUpState.username, signUpState.email, signUpState.password)
                                                setSignUpState({
                                                    name: '',
                                                    username: '',
                                                    email: '',
                                                    password: ''
                                                })
                                            }}
                                            style={styles.buttonView}/>
                                    </View>
                                </KeyboardAvoidingView>
                                <View style={styles.signUpView}>
                                    <CustomLink
                                        text='Already have an account? Click here to login'
                                        onPress={handleGoToSignIn}
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
