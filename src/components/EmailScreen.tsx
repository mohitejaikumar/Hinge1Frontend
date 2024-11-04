import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NextButton from './NextButton';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';


type EmailScreenProps = NativeStackScreenProps<AuthStackParamList, 'EmailScreen'>;

const EmailScreen = ({navigation}:EmailScreenProps) => {
    const [disabled, setDisabled] = useState(true);
    const emailRef = useRef<TextInput>(null);
    const [email , setEmail] = useState('');
    
    const getEmail = async()=>{
        const storageEmail = await getRegistrationProgress('Email');
        setEmail(storageEmail);
        if(storageEmail.length > 0){
            setDisabled(false);
        }
    }

    useEffect(()=>{
        emailRef.current?.focus();
        getEmail();
    },[])
    
    function isValidEmail(e:string) {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(e);
    }

    const handleEmailChange = async(text:string)=>{
        setEmail(text.trim());
        await saveRegistrationProgress('Email', text.trim());
        if(text.trim().length > 0 && isValidEmail(text.trim())){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.emailContainer}>
                <View style={styles.emailIcon}>
                    <MaterialCommunityIcons name="email-outline" size={23} color="#000000" />
                </View>
                <Text style={styles.largeText}>Please provide a valid {"\n"}email</Text>
                <TextInput
                    ref={emailRef}
                    value={email}
                    placeholder="email@example.com"
                    style={styles.emailInput}
                    placeholderTextColor='#DAE0E2'
                    keyboardType='email-address'
                    onChangeText={handleEmailChange}
                />
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('LocationScreen')
                }}
            />
            
        </SafeAreaView>
    )
}

export default EmailScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    emailIcon:{
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
    emailContainer:{
        marginTop:87
    },
    emailInput:{
        borderBottomWidth:1,
        marginTop:20,
        fontSize:25,
        fontFamily: 'ModernEra-Medium',
        fontWeight:'light',
        color:'#000000',
    },
    nextIcon:{
        height:55,
        width:55,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        position:'absolute',
        right:10,
        bottom:10,
    }
})