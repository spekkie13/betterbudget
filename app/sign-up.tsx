import * as React from "react"
import {useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import Title from "@/app/components/Text/Title"
import Logo from "@/app/components/UI/General/Logo"
import {styles_login} from '@/styles/styles_login'
import {Link} from "expo-router"
import {useThemeContext} from "@/theme/ThemeContext"
import {InputField} from "@/app/components/UI/InputField";
import Button from "@/app/components/UI/General/Button";
import {useAuth} from "@/hooks/useAuth";
import {MessageBanner} from "@/app/components/Text/MessageBanner";

function Login(): React.JSX.Element {
    const { signUp, loading, message } = useAuth()
    const { currentTheme } = useThemeContext()
    const styles = styles_login(currentTheme)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

                                <MessageBanner message={message ?? ''} />
                                <KeyboardAvoidingView behavior={'padding'}>
                                    <InputField
                                        value={name}
                                        onChange={setName}
                                        label={'Name'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={username}
                                        onChange={setUsername}
                                        label={'Username'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={email}
                                        onChange={setEmail}
                                        label={'Email'}
                                        secure={false}
                                    />
                                    <InputField
                                        value={password}
                                        onChange={setPassword}
                                        label={'Password'}
                                        secure={true}
                                    />
                                    <View style={styles.signInButtonView}>
                                        <Button
                                            text='Sign Up'
                                            onPress={() => signUp(email, password, name, username)}
                                            style={styles.buttonView}/>
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
