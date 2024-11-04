import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

type PreferredGenderScreenProps = NativeStackScreenProps<AuthStackParamList, 'PreferredGenderScreen'>;

const PreferredGenderScreen = ({navigation}:PreferredGenderScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.genderContainer}>
                <View style={styles.genderIcon}>
                    <Entypo name="heart-outlined" size={28} color="#000000" />
                </View>
                <Text style={styles.largeText}>Who would you like {"\n"}to date?</Text>
            </View>
            <Text style={styles.promptText}>Select all the people you're open to meeting.</Text>
            <View>
                <View style={[styles.genderViewContainer,{marginTop:80}]}>
                    <Text style={styles.genderName}>Male</Text>
                    <Pressable onPress={()=>setSelectedGender('Male')}>
                        <FontAwesome 
                        name={selectedGender === 'Male'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedGender === 'Male'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.genderViewContainer}>
                    <Text style={styles.genderName}>Women</Text>
                    <Pressable onPress={()=>setSelectedGender('Women')}>
                        <FontAwesome 
                        name={selectedGender === 'Women'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedGender === 'Women'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.genderViewContainer}>
                    <Text style={styles.genderName}>Non-binary</Text>
                    <Pressable onPress={()=>setSelectedGender('Non-binary')}>
                        <FontAwesome 
                        name={selectedGender === 'Non-binary'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedGender === 'Non-binary'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.genderViewContainer}>
                    <Text style={styles.genderName}>Everyone</Text>
                    <Pressable onPress={()=>setSelectedGender('Everyone')}>
                        <FontAwesome 
                        name={selectedGender === 'Everyone'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedGender === 'Everyone'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('DatingIntentionScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default PreferredGenderScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    genderIcon:{
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
    genderContainer:{
        marginTop:87
    },
    genderViewContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:30,
        borderBottomWidth:1,
        paddingBottom:10,
        borderBottomColor:'#DAE0E2'
        
    },
    genderName:{
        fontSize:15,
        fontFamily: 'ModernEra-Bold',
    },
    promptText:{
        fontFamily:'ModernEra-Medium',
        fontSize:13,
        color:'#2C3335',
        marginTop:20,
        lineHeight:20,
    }
    
})