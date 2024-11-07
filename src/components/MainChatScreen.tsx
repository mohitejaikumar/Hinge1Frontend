import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MainStackParamList } from '../navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSocket } from '../hooks/useSocket';
import { useToken } from '../hooks/useToken';
import axios from 'axios';
import { ChatBubble } from './ChatBubble';

type MainChatScreenProps = NativeStackScreenProps<MainStackParamList, 'MainChatScreen'>;
interface Message{
    id?:number,
    message:string,
    created_at:Date
    receiver_id:number
    sender_id:number
}

const MainChatScreen = ({navigation,route}:MainChatScreenProps) => {
    
    const [inputHeight,setInputHeight] = useState(30);
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('');
    const socket = useSocket();
    const {token} = useToken();
    const scrollRef = useRef<ScrollView>(null);
    
    const getAllChats = async()=>{
        try{
            const response = await axios.get(`http://10.81.4.206:3000/users/chats/${route.params.id}`,{                
                headers:{
                    authorization:token
                }
            });
            setMessages(response.data);
            scrollRef.current?.scrollToEnd({animated:true});
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getAllChats();
    },[]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:route.params?.first_name,
            headerTitleStyle:{
                fontFamily:'ModernEra-Bold',
                fontSize:25,
            },
            headerLeft:()=>{
                return (
                    <>   
                        <Pressable
                            onPress={()=>{
                                navigation.replace('Main');
                            }}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="#000000"
                            />
                        </Pressable>
                        <Image
                            source={{
                                uri:route.params?.image
                            }}
                            style={{
                                width:50,
                                height:50,
                                borderRadius:100,
                                resizeMode:'cover',
                                margin:10
                            }}
                        />
                    </>
                )
            },
            
        })
    },[])
    useEffect(()=>{
        if(socket){
            socket.onmessage = (event)=>{
                const data = JSON.parse(event.data);
                console.log(data);
                if(data.type === 'chat' && data.payload.senderId === route.params?.id){
                    setMessages((prev)=>[...prev,{
                        message:data.payload.message,
                        created_at:new Date(),
                        receiver_id:34,
                        sender_id:route.params?.id
                    }]);
                }
            }
        }
    },[socket])

    useEffect(()=>{
        scrollRef.current?.scrollToEnd({animated:true});
    },[messages])

    const handleSend = ()=>{
        if(socket){
            setMessages((prev)=>[...prev,{
                message:message,
                created_at:new Date(),
                receiver_id:route.params?.id,
                sender_id:34
            }]);
            socket.send(JSON.stringify({
                type:'chat',
                payload:{
                    token:token,
                    receiverId:route.params?.id,
                    message:message
                }
            }))
            setMessage('');
        }
    }

    const messageChange = (text:string)=>{
        setMessage(text);
    }

    return (
        <>
        <ScrollView 
            style={styles.container} 
            ref={scrollRef}
            showsVerticalScrollIndicator={true}
        >
            {messages.map((text,index)=>{
                return (
                    (text.sender_id === route.params?.id) ? 
                    <ChatBubble key={index} message={text.message} isSender={false} />
                    :
                    <ChatBubble key={index} message={text.message} isSender={true} />
                )
            })

            }
            
        </ScrollView>
        <View style={styles.bottomBar}>
                <TextInput
                    placeholder="Send a message"
                    placeholderTextColor="#7f8c8d"
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onChangeText={messageChange}
                    scrollEnabled={true}
                    onContentSizeChange={(e)=>{
                        setInputHeight(e.nativeEvent.contentSize.height);
                    }}
                    style={{
                        fontFamily:'ModernEra-Medium',
                        color:'#000000',
                        backgroundColor:'#fff',
                        fontSize:18,
                        alignSelf:'stretch',
                        paddingHorizontal:25,
                        paddingVertical:15,
                        width:'80%',
                        height:Math.min(inputHeight,100),
                        borderWidth:1,
                        borderColor:'#95a5a6',
                        borderRadius:100,
                    }}
                />
                <Pressable
                    onPress={handleSend}
                    style={{
                        width:50,
                        height:50,
                        backgroundColor:'#66295B',
                        borderRadius:100,
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <AntDesign
                        name="arrowup"
                        size={25}
                        color="white"
                    />
                </Pressable>
                
        </View>
        </>
    )
}

export default MainChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        paddingHorizontal:25,
        marginBottom:"20%"
    },
    bottomBar:{
        position:'absolute',
        bottom:10,
        right:0,
        left:15,
        color:'#000000',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        gap:10,
    }
})