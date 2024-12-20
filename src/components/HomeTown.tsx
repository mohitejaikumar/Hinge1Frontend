import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';

type HomeTownProps = NativeStackScreenProps<AuthStackParamList, 'HomeTown'>;


const HomeTown = ({navigation}:HomeTownProps) => {
    const [disabled, setDisabled] = useState(true);
    const homeTownRef = useRef<TextInput>(null);
    const [homeTown, setHomeTown] = useState('');
    
    async function getHomeTown(){
        const storageHomeTown = await getRegistrationProgress('HomeTown');
        setHomeTown(storageHomeTown);
        if(storageHomeTown.length > 0){
            setDisabled(false);
        }
    }
    
    useEffect(()=>{
        homeTownRef.current?.focus();
        getHomeTown();
    },[])
    
    const handleHomeTownChange = async(text:string)=>{
        setHomeTown(text.trim());
        await saveRegistrationProgress('HomeTown', text.trim());
        if(text.trim().length > 0){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
                <View style={styles.homeIcon}>
                    <Ionicons name="home-outline" size={25} color="#000000" />
                </View>
                <Text style={styles.largeText}>Where's your home {"\n"}town?</Text>
                <TextInput
                    ref={homeTownRef}
                    placeholder="Home Town"
                    value ={homeTown}
                    onChangeText={handleHomeTownChange}
                    style={styles.homeInput}
                    placeholderTextColor='#DAE0E2'
                />
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('ReligionScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default HomeTown

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    homeIcon:{
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
    homeContainer:{
        marginTop:87
    },
    homeInput:{
        borderBottomWidth:1,
        marginTop:30,
        paddingVertical:10,
        fontSize:30,
        fontFamily: 'ModernEra-Bold',
        fontWeight:'light',
        color:'#000000',
    },
    
})