import * as React from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native"

import { TextInput } from 'react-native-paper'
import Title from "@/app/general/Title"
import Logo from "@/app/general/Logo"
import { supabase } from '@/lib/supabase'

import {useState, useContext} from "react"
import { styles_login } from '@/styles/styles_login'
import CustomDarkTheme from "@/theme/CustomDarkTheme";
import CustomDefaultTheme from "@/theme/CustomDefaultTheme";
import {getUser, createNewUser} from "@/api/UserController";
import {AuthContext} from "@/app/ctx";
import {genericFailureMessage} from "@/constants/MessagesConstants";
import {User} from "@/models/user";
import {Link} from "expo-router";
import CustomButton from "@/app/general/CustomButton";
import {getTeamById} from "@/api/TeamController";
import {Team} from "@/models/team";

function Login() : React.JSX.Element {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)

    const colorScheme = useColorScheme()
    const currentTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme
    const styles = styles_login(currentTheme)

    const signUp = async (): Promise<void> => {
        setLoading(true);
        if (!password || !email) {
            setLoading(false);
            return;
        }
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                alert('Registration failed: ' + error.message);
                return;
            }

            const user: User = await getUser(data.user?.email);
            const team: Team = await getTeamById(user.teamId);
            const success: boolean = await createNewUser(user);

            if (success) {
                login(user, team);
                alert('Check your email to confirm your account!');
            } else {
                alert(genericFailureMessage);
            }
        } catch (e: any) {
            console.error(e);
            alert('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };


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
                            <View style={{borderWidth: 1, borderStyle: 'solid', borderColor: currentTheme.colors.backgroundDark, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: currentTheme.colors.tertiary}}>
                                <Text style={{color: currentTheme.colors.textColor, fontSize: 24, textAlign: 'center'}}>Sign up</Text>
                                <KeyboardAvoidingView behavior={'padding'} >
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
                                    <TouchableOpacity
                                        onPress={signUp}
                                        style={styles.buttonView}>
                                            <CustomButton text={'Sign up'} color={''}/>
                                    </TouchableOpacity>
                                </KeyboardAvoidingView>
                                <View style={{alignItems: 'center', width: '100%', height: 40, marginTop: 10}}>
                                    <Link href="/sign-in">
                                        <Text style={{color: currentTheme.colors.textColor, fontStyle: 'italic'}}>Already have an account? Click here to login</Text>
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
