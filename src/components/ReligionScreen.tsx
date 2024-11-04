import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import NextButton from './NextButton';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Octicons from 'react-native-vector-icons/Octicons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';

type ReligionScreenProps = NativeStackScreenProps<AuthStackParamList, 'ReligionScreen'>;

const ReligionScreen = ({navigation}:ReligionScreenProps) => {
    const [disabled, setDisabled] = useState(true);
    const [selectedReligion, setSelectedReligion] = useState('');
    
    const getReligion = async()=>{
        const religion = await getRegistrationProgress('Religion');
        if(religion){
            setSelectedReligion(religion);
            setDisabled(false);
        }
    }

    useEffect(()=>{
        getReligion();
    },[])

    const handleReligionChange = async(text:string)=>{
        setSelectedReligion(text);
        await saveRegistrationProgress('Religion', text);
        setDisabled(false);
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.religionContainer}>
                <View style={styles.religionIcon}>
                    <Octicons name="book" size={25} color="#000000" />
                </View>
                <Text style={styles.largeText}>What are your religious {"\n"}beliefs?</Text>
            </View>
            
            <View>
                <View style={[styles.religionViewContainer,{marginTop:80}]}>
                    <Text style={styles.religionName}>Hindu</Text>
                    <Pressable onPress={()=>handleReligionChange('Hindu')}>
                        <FontAwesome 
                        name={selectedReligion === 'Hindu'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedReligion === 'Hindu'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.religionViewContainer}>
                    <Text style={styles.religionName}>Muslim</Text>
                    <Pressable onPress={()=>handleReligionChange('Muslim')}>
                        <FontAwesome 
                        name={selectedReligion === 'Muslim'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedReligion === 'Muslim'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.religionViewContainer}>
                    <Text style={styles.religionName}>Sikh</Text>
                    <Pressable onPress={()=>handleReligionChange('Sikh')}>
                        <FontAwesome 
                        name={selectedReligion === 'Sikh'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedReligion === 'Sikh'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.religionViewContainer}>
                    <Text style={styles.religionName}>Christian</Text>
                    <Pressable onPress={()=>handleReligionChange('Christian')}>
                        <FontAwesome 
                        name={selectedReligion === 'Christian'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedReligion === 'Christian'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.religionViewContainer}>
                    <Text style={styles.religionName}>Atheist</Text>
                    <Pressable onPress={()=>handleReligionChange('Atheist')}>
                        <FontAwesome 
                        name={selectedReligion === 'Atheist'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedReligion === 'Atheist'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('ImagesScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default ReligionScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    religionIcon:{
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
    religionContainer:{
        marginTop:87
    },
    religionViewContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:30,
        borderBottomWidth:1,
        paddingBottom:10,
        borderBottomColor:'#DAE0E2'
        
    },
    religionName:{
        fontSize:15,
        fontFamily: 'ModernEra-Bold',
    },
    
    
})