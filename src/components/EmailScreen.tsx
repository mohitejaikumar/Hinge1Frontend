import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NextButton from './NextButton';


type EmailScreenProps = NativeStackScreenProps<AuthStackParamList, 'EmailScreen'>;

const EmailScreen = ({navigation}:EmailScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const emailRef = useRef<TextInput>(null);
    
    useEffect(()=>{
        emailRef.current?.focus();
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.emailContainer}>
                <View style={styles.emailIcon}>
                    <MaterialCommunityIcons name="email-outline" size={23} color="#000000" />
                </View>
                <Text style={styles.largeText}>Please provide a valid {"\n"}email</Text>
                <TextInput
                    ref={emailRef}
                    placeholder="email@example.com"
                    style={styles.emailInput}
                    placeholderTextColor='#DAE0E2'
                    keyboardType='email-address'
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