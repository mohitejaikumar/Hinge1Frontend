import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { RegistrationProvider } from '../hooks/useRegistration';
import { useToken } from '../hooks/useToken';


const AppStack = () => {
    
    const {token} = useToken();

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