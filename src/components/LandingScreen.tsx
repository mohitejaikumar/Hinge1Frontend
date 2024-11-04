import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoImage from '../../assets/images/brand_logo.png';


type LandingScreenProps = NativeStackScreenProps<AuthStackParamList, 'LandingScreen'>;

const LandingScreen = ({navigation}:LandingScreenProps) => {




    const handleCreateAccount = ()=>{
        navigation.navigate('PhoneNumber')
    }



    return (
        <SafeAreaView style={styles.continer}>
            <View style={styles.logoContainer}>
                <Image
                    source={LogoImage}
                    style={styles.logo}
                />
                <Text style={styles.smallText}>Designed to be deleted.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
                    <Text style={styles.button}>Create account</Text>
                </TouchableOpacity>
                <Pressable  >
                    <Text style={[styles.button ,{color:'#000000'}]}>Sign In</Text>
                </Pressable>
            </View>
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
        marginTop:180
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
    },
    createButton:{
        backgroundColor:'#66295B',
        paddingHorizontal:100,
        paddingVertical:15,
        borderRadius:50
    },
    button:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
    },
});