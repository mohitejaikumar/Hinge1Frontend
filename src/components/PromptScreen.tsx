import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useFocusEffect } from '@react-navigation/native';
import { useRegistration } from '../hooks/useRegistration';

type PromptScreenProps = NativeStackScreenProps<AuthStackParamList, 'PromptScreen'>;

type Prompt = string |{
    question:string,
    answer:string
}

const PromptScreen = ({navigation,route}:PromptScreenProps) => {
    const [disabled, setDisabled] = useState(true);
    const [prompts, setPrompts] = useState<Prompt[]>(["","",""]);
    const {setBehaviours} = useRegistration();
    
    useEffect(()=>{
        
        if (route.params) {
            const newPrompt = route.params?.prompts;
            
            if(newPrompt){
                setPrompts(newPrompt);
                console.log(route.params?.prompts);
                let isDone = true;
                
                for(let i=0;i<newPrompt.length;i++){
                    if(newPrompt![i] === ""){
                        isDone = false;
                        break;
                    }
                }
                //@ts-ignore
                setBehaviours(newPrompt);
                setDisabled(!isDone);
            }
            
        }
        
    },[]);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.promptContainer}>
                <View style={styles.promptIcon}>
                    <Fontisto name="quote-a-right" size={20} color="#000000" />
                </View>
                <Text style={styles.largeText}>Write your profile {"\n"}answers</Text>
            </View>

            <View style={{marginTop:40}}>
                {
                    prompts.map((prompt,index)=>{
                        return (
                            (typeof prompt === 'object') ? 
                                <Pressable key={index} style={styles.notNullPrompt} onPress={()=>navigation.push('Prompts',{prompts,index})}>
                                    <Text style={{fontFamily:'ModernEra-Medium' , fontSize:15}}>{prompt.question}</Text>
                                    <Text style={{fontFamily:'ModernEra-Medium' , fontSize:13, color:'#A4B0BD'}}>{prompt.answer}</Text>
                                    
                                    <Entypo 
                                        name="circle-with-cross" 
                                        size={20} 
                                        color="#66295B"
                                        
                                        style={styles.cross} 
                                    />
                                </Pressable>
                                :
                                <Pressable key={index} style={styles.nullPrompt} onPress={()=>navigation.push('Prompts',{prompts,index})}>
                                    <Text style={{fontFamily:'ModernEra-Bold' , fontSize:16, color:'#99AAAB'}}>Select a Prompt</Text>
                                    <Text style={{fontFamily:'ModernEra-Medium', fontStyle:'italic' , fontSize:16, color:'#A4B0BD'}}>And write your own answer</Text>
                                    <AntDesign 
                                        name="pluscircle" 
                                        size={20} 
                                        color="#66295B" 
                                        style={styles.plus} 
                                    />
                                </Pressable>
                            
                        )
                    })
                }
            </View>
            <Text style={{marginTop:10, color:'#A4B0BD'}}>3 answers required</Text>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('WorkScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default PromptScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    promptIcon:{
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
    promptContainer:{
        marginTop:87
    },
    nullPrompt:{
        height:100,
        width:'100%',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        marginTop:20,
        borderColor:'#A4B0BD',
        paddingHorizontal:15,
        paddingVertical:20,
        gap:10
    },
    notNullPrompt:{
        height:100,
        width:'100%',
        borderWidth:1,
        borderRadius:10,
        marginTop:20,
        borderColor:'#A4B0BD',
        paddingHorizontal:15,
        paddingVertical:20,
        gap:10
    },
    plus:{
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:'white',
        transform: [{ translateX: "25%" },{translateY: "-25%"}]
    },
    cross:{
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:'white',
        borderRadius:100,
        transform: [{ translateX: "20%" },{translateY: "-30%"}]
    }
    
})