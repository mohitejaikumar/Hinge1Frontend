import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';

type Prompt={
    question:string,
    answer:string
}

type SelectPromptScreenProps = NativeStackScreenProps<AuthStackParamList, 'Prompts'>;

const SelectPrompt = ({navigation, route}:SelectPromptScreenProps) => {
    
    
    const prompts =[
        'My most irrational fear',
        'The way to win me over is',
        'Dating me is like',
        'Typical Sunday',
        'A random fact I love is',
        'A life goal of mine',
        'My simple pleasures',
        'I am convinced that',
        'I go crazy for',
        'I recently discoverd that',
        'This year I really want to'
    ]
    
    
    return (
        <>
        <SafeAreaView style={styles.container}>
            <View style={styles.aboutMe}>
                <Text style={{ fontFamily:'ModernEra-Bold',fontSize:15,color:'white'}}>About me</Text>
            </View>
            <View style={{borderBottomWidth:1, marginTop:10, borderBottomColor:'#DAE0E2'}}></View>
            <View style={{marginTop:50}}>
                { prompts.map((prompt,index)=>{
                        return (
                            <Pressable 
                                style={{paddingBottom:15 , borderBottomWidth:1, borderBottomColor:'#DAE0E2', marginTop:25}} 
                                key={index} 
                                onPress={()=>{
                                    navigation.push('Write Answer',{question:prompt, prompts:route.params?.prompts,index:route.params?.index!})
                                }}
                            >
                                <Text style={{fontFamily:'ModernEra-Medium',fontSize:15}}>{prompt}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </SafeAreaView>
        
        </>
        
    )
}

export default SelectPrompt

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    aboutMe:{
        backgroundColor:'#66295B',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:50,
        marginTop:20,
        width:120,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
})