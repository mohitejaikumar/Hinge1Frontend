import { StyleSheet, Text, TextInput,  View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../navigation/AuthStack'
import NextButton from './NextButton'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';

type PhoneNumberProps = NativeStackScreenProps<AuthStackParamList, 'PhoneNumber'>;

const PhoneNumber = ({navigation}:PhoneNumberProps) => {
    const [disabled, setDisabled] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneNumberRef = useRef<TextInput>(null);
    async function getPhoneNumber(){
        const phonenumber = await getRegistrationProgress('PhoneNumber');
        setPhoneNumber(phonenumber);
        if(phonenumber.length === 10){
            setDisabled(false);
        }
    }
    
    useEffect(()=>{
        phoneNumberRef.current?.focus();
        getPhoneNumber();
    },[])

    const handlePhoneNumberChange = async(text:string)=>{
        setPhoneNumber(text.trim());
        await saveRegistrationProgress('PhoneNumber',text.trim());
        if(text.trim().length === 10){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.numberContainer}>
                <View style={styles.callIcon}>
                    <Feather name="phone-call" size={20} color="#000000" />

                </View>
                <Text style={styles.largeText}>What's your phone {"\n"}number?</Text>
                <TextInput
                    ref={phoneNumberRef}
                    placeholder="Enter your phone number"
                    maxLength={10}
                    value={phoneNumber}
                    style={styles.numberInput}
                    placeholderTextColor='#DAE0E2'
                    keyboardType='phone-pad'
                    onChangeText={handlePhoneNumberChange}
                />
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('NameScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default PhoneNumber

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    callIcon:{
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
    numberContainer:{
        marginTop:87
    },
    numberInput:{
        borderBottomWidth:1,
        marginTop:20,
        fontSize:20,
        fontFamily: 'ModernEra-Medium',
        fontWeight:'light',
        color:'#000000',
    },
    
})