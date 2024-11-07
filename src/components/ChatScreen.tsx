import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { BottomTabsParamList } from '../navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


interface People{
    id:number;
    first_name:string;
    images:{
        id:number,
        url:string
    }[],
    chats_sent:{
        message:string,
        created_at:Date,
    }[],
    chats_received:{
        message:string,
        created_at:Date,
    }[]
}
type ChatScreenProps = NativeStackScreenProps<BottomTabsParamList, 'Chat'>;
const ChatScreen = ({navigation}:ChatScreenProps) => {
    
    const {token} = useToken();
    const [people, setPeople] = useState<People[]>([]);


    const getPeople = async ()=>{
        try{
            const response = await axios.get('http://10.81.4.206:3000/users/allMatches',{                
                headers:{
                    authorization:token
                }
            });
            setPeople(response.data.people);
        }
        catch(err){
            console.error(err);
        }
    }
    
    useFocusEffect(
        useCallback(()=>{
                getPeople();
        },[])
    )

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.largeText}>
                Matches
            </Text>
            <View style={{marginTop:50}}>
                {
                    people.map((person,index)=>{
                        return (
                            <Pressable 
                                style={{
                                    flex:1, 
                                    flexDirection:'row' , 
                                    alignItems:'center' , 
                                    marginTop:15 , 
                                    borderBottomWidth:1, 
                                    borderBottomColor:'#DADADA',
                                    paddingBottom:10,
                                    gap:15,
                                    
                                }} 
                                key={index}
                                onPress={()=>{
                                    //@ts-ignore
                                    navigation.push('MainChatScreen',
                                        {
                                            id:person.id , 
                                            first_name:person.first_name,
                                            image:person.images[0].url
                                        },
                                    )
                                }}
                            >
                                <Image 
                                    source={{
                                        uri:person.images[0].url
                                    }}
                                    style={{
                                        width:80,
                                        height:80,
                                        resizeMode:'cover',
                                        borderRadius:100
                                    }}
                                />
                                <View>
                                    <Text style={{fontFamily:'ModernEra-Bold' , fontSize:20}}>{person.first_name}</Text>
                                    {person.chats_sent[0]?.created_at > person.chats_received[0]?.created_at ?
                                        <Text>{person.chats_sent[0]?.message.slice(0,25)}..</Text>
                                        :
                                        <Text>{person.chats_received[0]?.message.slice(0,25)}..</Text>
                                    }
                                </View>
                            </Pressable>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative',
        paddingHorizontal:25,
    },
    largeText:{
        fontSize:30,
        fontFamily:'ModernEra-Bold',
        marginTop:'15%',
    }
})