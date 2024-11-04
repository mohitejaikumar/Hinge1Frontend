import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';



const AppStack = () => {
    const [token, setToken] = useState<null | string>("jai");

    return (
        <NavigationContainer>
        {token === null || token === '' ? <AuthStack /> : <MainStack/>}
        </NavigationContainer>
    );
};

export default AppStack;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});