import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import Feather from 'react-native-vector-icons/Feather'


type PasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'PasswordScreen'>;

const PasswordScreen = ({navigation}:PasswordScreenProps) => {
  const [disabled, setDisabled] = useState(true);
    const passwordRef = useRef<TextInput>(null);
    const [password, setPassword] = useState('');
    
    const getPassword = async()=>{
        const pass = await getRegistrationProgress('Password');
        if(pass){
            setPassword(pass);
            setDisabled(false);
        }
    }

    useEffect(()=>{
        passwordRef.current?.focus();
        getPassword();
    },[])

    const handlePasswordChange = async(text:string)=>{
        setPassword(text.trim());
        if(text.trim().length > 0){
            await saveRegistrationProgress('Password', text.trim());
            setDisabled(false);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.passwordContainer}>
                <View style={styles.passwordIcon}>
                    <Feather name="lock" size={25} color="#000000" />
                </View>
                <Text style={styles.largeText}>Password</Text>
                <TextInput
                    ref={passwordRef}
                    placeholder="********"
                    maxLength={8}
                    secureTextEntry={true}
                    style={styles.passwordInput}
                    placeholderTextColor='#DAE0E2'
                    value={password}
                    onChangeText={handlePasswordChange}
                />
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('FinalScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default PasswordScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    passwordIcon:{
        height:40,
        width:40,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        borderWidth:2,
        borderColor:'#000000',
        marginBottom:20
    },
    largeText:{
        fontSize:33,
        fontFamily: 'TiemposHeadline-Semibold',
        lineHeight:43
    },
    passwordContainer:{
        marginTop:87
    },
    passwordInput:{
        borderBottomWidth:1,
        marginTop:30,
        paddingVertical:10,
        fontSize:30,
        fontFamily: 'ModernEra-Bold',
        fontWeight:'light',
        color:'#000000',
    },
    
})