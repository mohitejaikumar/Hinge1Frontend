import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoImage from '../../assets/images/brand_logo.png';
import { GoogleSignin, SignInResponse, SignInSuccessResponse } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import NotAccountImage from '../../assets/images/notAccount.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


type LandingScreenProps = NativeStackScreenProps<AuthStackParamList, 'LandingScreen'>;

GoogleSignin.configure({
    //@ts-ignore
	androidClientId: Config.PROD_ANDROID_CLIENT_ID,
	scopes: ['profile', 'email'],
});

const LandingScreen = ({navigation}:LandingScreenProps) => {
    const [siginIn , setSignIn] = useState(false);
    const [loading , setLoading] = useState(false);
    const {setToken,token} = useToken();
    const [showDialog , setShowDialog] = useState(false);
    const [signInWithPassword, setSignInWithPassword] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginError, setShowLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateAccount = ()=>{
        navigation.navigate('PhoneNumber')
    }

    const googleLogin = async()=>{
        await GoogleSignin.signOut();
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    }

    const handleGoogleLogin = async()=>{
        setLoading(true);
        const userInfo = await googleLogin();
        if(userInfo?.type === 'success'){
            const email = userInfo.data.user.email;
            // send this email to backend to login 
            try{
                const response = await axios.post('http://10.81.0.239:3000/users/googleLogin',{
                    email:email
                });
                if(response.data.token){
                    setToken(response.data.token);
                    await AsyncStorage.setItem('token',response.data.token);
                }
                
            }
            catch(error){
                console.error(error);
                //@ts-ignore
                if(error.response.status === 400){
                    setShowDialog(true);
                }
            }
        }
        setLoading(false);
    }
    const handleCloseDialog = ()=>{
        setShowDialog(false);
    }
    const handleSignInWithPassword = async()=>{
        setLoading(true);
        try{
            const response = await axios.post('http://10.81.0.239:3000/users/login',{
                email:userEmail,
                password:password
            });
            if(response.data.token){
                setToken(response.data.token);
                await AsyncStorage.setItem('token',response.data.token);
            }
        }
        catch(error){
            //@ts-ignore
            if(error.response.status === 400){
                setShowLoginError(true);
                //@ts-ignore
                setErrorMessage(error.response.data.message);
            }
        }
        setLoading(false);
    }
    const handleBack=()=>{
        setSignInWithPassword(false);
        setShowDialog(false);
        setSignIn(false);
    }

    return (
        <SafeAreaView style={styles.continer}>
            <Text>{token}</Text>
            <View style={styles.logoContainer}>
                <Image
                    source={LogoImage}
                    style={styles.logo}
                />
                <Text style={styles.smallText}>Designed to be deleted.</Text>
            </View>
            {loading && 
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#66295B" />
                </View>
            }
            {!siginIn && 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
                        <Text style={styles.button}>Create account</Text>
                    </TouchableOpacity>
                    <Pressable onPress={()=>setSignIn(true)} >
                        <Text style={[styles.button ,{color:'#000000'}]}>Sign In</Text>
                    </Pressable>
                </View>
            }
            {siginIn && !signInWithPassword && 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity disabled={loading} style={[styles.createButton ,styles.googleButton]} onPress={handleGoogleLogin}>
                        <Text style={[styles.button,styles.googleText]}>Sign in with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton} onPress={()=>setSignInWithPassword(true)}>
                        <Text style={[styles.button]}>Sign in with password</Text>
                    </TouchableOpacity>
                    <Pressable onPress={handleBack} >
                        <Text style={[styles.button ,{color:'#000000'}]}>Back</Text>
                    </Pressable>
                </View>
            }
            { signInWithPassword &&
                <View style={{width:'90%' , gap:20}}>
                    {
                        showLoginError &&
                        <View style={{marginTop:20, width:'100%'}}>
                            <Text style={{fontFamily:'ModernEra-Medium' ,textAlign:'center', color:'red'}}>{errorMessage}</Text>
                        </View>
                    }
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#7f8c8d"
                        multiline={true}
                        numberOfLines={4}
                        value={userEmail}
                        onChangeText={(text)=>setUserEmail(text)}
                        style={styles.inputText}
                    />
                    <TextInput 
                        placeholder="Password"
                        placeholderTextColor="#7f8c8d"
                        value={password}
                        maxLength={8}
                        onChangeText={(text)=>setPassword(text)}
                        secureTextEntry={true}
                        style={[styles.inputText]}
                    />
                    <TouchableOpacity style={styles.createButton} onPress={handleSignInWithPassword}>
                        <Text style={[styles.button]}>Sign in with password</Text>
                    </TouchableOpacity>
                    <Pressable onPress={handleBack} >
                        <Text style={[styles.button ,{color:'#000000'}]}>Back</Text>
                    </Pressable>
                </View>
            }
            { showDialog &&
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogBox}>
                        <Image
                            source={NotAccountImage}
                            style={{
                                width:'100%',
                                height:'50%',
                                resizeMode:'contain',
                            }}
                        />
                        <View style={{paddingHorizontal:25 , marginTop:30}}>
                            <Text style={styles.largeText}>Your Google account {'\n'} isn't linked to Hinge</Text>
                            <Text style={styles.smallDialogText}>Try sigining in with your phone number. {'\n'}You can then connect your Google account in Settings.</Text>
                            <TouchableOpacity style={styles.okButton} onPress={handleCloseDialog}>
                                <Text style={[styles.button]}>OK, got it</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            }
            
            
        </SafeAreaView>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    continer:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingBottom:50
    },
    logoContainer:{
        display:'flex',
        alignItems: 'center',
        marginTop:100
    },
    logo:{
        
    },
    smallText:{
        fontSize:17,
        fontWeight:'bold',
    },
    buttonContainer:{
        display:'flex',
        gap:20,
        alignItems: 'center',
        width:'90%',
    },
    createButton:{
        backgroundColor:'#66295B',
        width:'100%',
        paddingVertical:15,
        borderRadius:50
    },
    button:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    googleButton:{
        backgroundColor:'#EAF0F1',
        textAlign:'center',
    },
    googleText:{
        color:'#000000',
    },
    dialogContainer:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:0,
        backgroundColor:'#EAF0F1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
    },
    dialogBox:{
        height:'70%',
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:10,
    },
    largeText:{
        fontSize:30,
        fontFamily: 'TiemposHeadline-Semibold',
        lineHeight:43
    },
    smallDialogText:{
        marginTop:12,
        fontSize:14,
        color:'#7B8788',
        fontFamily: 'ModernEra-Medium',
        lineHeight:25,
        marginBottom:20,
    },
    okButton:{
        backgroundColor:'#66295B',
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:50
    },
    inputText:{
        fontFamily:'ModernEra-Medium',
        color:'#2C3335',
        backgroundColor:'#EAF0F1',
        fontSize:20,
        marginTop:2,
        width:'100%',
        borderRadius:20,
        paddingHorizontal:25,
        paddingVertical:15,
    },
    loaderContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        display:'flex',
        justifyContent:'center',    
        alignItems:'center',
        zIndex:100,
    }
});