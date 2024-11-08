import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { RegistrationProvider } from '../hooks/useRegistration';
import { useToken } from '../hooks/useToken';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppStack = () => {
    
    const {token , setToken} = useToken();

    const getToken = async()=>{
        const tokn = await AsyncStorage.getItem('token');
        if(tokn){
            setToken(tokn);
        }
    }


    useEffect(()=>{
        getToken();
    },[])

    return (
        <NavigationContainer>
        {token === null || token === '' ?
            <RegistrationProvider>
                <AuthStack /> 
            </RegistrationProvider>
            : 
            <MainStack/>
        }
        </NavigationContainer>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});