import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';


type WorkScreenProps = NativeStackScreenProps<AuthStackParamList, 'WorkScreen'>;


const WorkScreen = ({navigation}:WorkScreenProps) => {
    const [disabled, setDisabled] = useState(true);
    const workScreenRef = useRef<TextInput>(null);
    const [occupation, setOccupation] = useState('');
    
    const getOccupation = async()=>{
        const occup = await getRegistrationProgress('Occupation');
        if(occup){
            setOccupation(occup);
            setDisabled(false);
        }
    }

    useEffect(()=>{
        workScreenRef.current?.focus();
        getOccupation();
    },[])

    const handleOccupationChange = async(text:string)=>{
        setOccupation(text.trim());
        if(text.trim().length > 0){
            await saveRegistrationProgress('Occupation', text.trim());
            setDisabled(false);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.workContainer}>
                <View style={styles.workIcon}>
                    <MaterialCommunityIcons name="bag-personal-outline" size={25} color="#000000" />
                </View>
                <Text style={styles.largeText}>What do you do?</Text>
                <TextInput
                    ref={workScreenRef}
                    placeholder="Occupation"
                    style={styles.workInput}
                    placeholderTextColor='#DAE0E2'
                    value={occupation}
                    onChangeText={handleOccupationChange}
                    
                />
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('PasswordScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default WorkScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    workIcon:{
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
    workContainer:{
        marginTop:87
    },
    workInput:{
        borderBottomWidth:1,
        marginTop:30,
        paddingVertical:10,
        fontSize:30,
        fontFamily: 'ModernEra-Bold',
        fontWeight:'light',
        color:'#000000',
    },
    
})