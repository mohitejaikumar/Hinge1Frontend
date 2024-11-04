import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';

type WriteAnswerScreenProps = NativeStackScreenProps<AuthStackParamList, 'Write Answer'>;

const WriteAnswerScreen = ({navigation,route}:WriteAnswerScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const [answer, setAnswer] = useState('');
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={{fontFamily:'ModernEra-Medium',fontSize:20,color:'#000000'}}>{route.params?.question}</Text>
            </View>
            
            <TextInput
                placeholder="Write your answer"
                placeholderTextColor="#A4B0BD"
                multiline={true}
                editable={true}
                numberOfLines={4}
                maxLength={250}
                style={styles.input}
                onChangeText={(text)=>setAnswer(text)}
            />
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;

                    const newPrompts = route.params?.prompts.map((prompt,index)=>{
                        if(index === route.params?.index){
                            return {question:route.params?.question, answer:answer}
                        }
                        else{
                            return prompt
                        }
                    })
                    navigation.replace('PromptScreen',{prompts:newPrompts})
                }}
            />
            
        </SafeAreaView>
    )
}

export default WriteAnswerScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    questionContainer:{
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:5,
        backgroundColor:'#EFEFEF',
        marginTop:10,
        height:80,
        paddingTop:30
    },
    input:{
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        fontSize:20,
        color:'#000000',
        paddingHorizontal: 10,
        width: '100%',
        marginTop:30,
        fontFamily:'ModernEra-Medium'
    }
})