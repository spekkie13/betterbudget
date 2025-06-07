import * as React from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {ActivityIndicator, Text, KeyboardAvoidingView, ScrollView, useColorScheme, View, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-paper"
import Title from "@/app/general/Title"
import Logo from "@/app/general/Logo"
import {useState, useContext} from "react"
import { styles_login } from '@/styles/styles_login'
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {getUser} from "@/api/UserController";
import {AuthContext} from "@/app/ctx";
import {Link, router} from 'expo-router'
import {errorLoginMessage, genericFailureMessage} from "@/constants/MessagesConstants";
import CustomButton from "@/app/general/CustomButton";
import {supabase} from "@/lib/supabase";
import {getTeamById} from "@/api/TeamController";

function Login() : React.JSX.Element {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submissionMessage, setSubmissionMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    const { login } = useContext(AuthContext)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_login(currentTheme)

    const signIn = async (): Promise<void> => {
        setLoading(true);
        if (!password || !email) {
            setLoading(false);
            ShowMessage(errorLoginMessage);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error || !data.user) {
                ShowMessage(errorLoginMessage);
                return;
            }

            const user = await getUser(data.user.email);
            const team = await getTeamById(user.teamId)
            login(user, team);
            router.replace("/home/");
        } catch (error) {
            console.log("Something went wrong logging in: ", error);
            alert(genericFailureMessage);
        } finally {
            setLoading(false);
        }
    };


    const ShowMessage = (message: string) => {
        setSubmissionMessage(message)
        setMessageVisible(true)
        setTimeout(() => {
            setMessageVisible(false)
        }, 3000)
    }

    return (
        <SafeAreaView style={{backgroundColor: currentTheme.colors.background, flex: 1}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Title text={'Better Budget'}/>
                <Logo/>
                <View style={styles.container}>
                    {loading ? (
                        <ActivityIndicator size="small" style={{ margin: 28}} />
                    ) : (
                        <View>
                            <View style={{borderWidth: 1, borderStyle: 'solid', borderColor: currentTheme.colors.backgroundDark, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: currentTheme.colors.secondary}}>
                                <Text style={{color: currentTheme.colors.textColor, fontSize: 24, textAlign: 'center'}}>Sign in</Text>
                                {messageVisible && (
                                    <View>
                                        <Text style={{color: currentTheme.colors.failureColor, textAlign: 'center'}}>
                                            {submissionMessage}
                                        </Text>
                                    </View>
                                )}
                                <KeyboardAvoidingView behavior={'padding'} >
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
                                    <View style={{width: '100%', alignItems: 'center'}}>
                                        <TouchableOpacity
                                            onPress={signIn}
                                            style={styles.buttonView}>
                                            <CustomButton text={'Sign in'} color={''}/>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                                <View style={{alignItems: 'center', width: '100%', marginTop: 10, height: 40}}>
                                    <Link href="/sign-up">
                                        <Text style={{color: currentTheme.colors.textColor, fontStyle: 'italic'}}>Don't have an account yet? Click here to sign up</Text>
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
