import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { RegistrationProvider } from '../hooks/useRegistration';


const AppStack = () => {
    const [token, setToken] = useState<null | string>("");

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