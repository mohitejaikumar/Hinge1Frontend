import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LikesStackParamList } from '../navigation/MainStack';
import ProfileDisplay from './ProfileDisplay';
import LikedComponent from './LikedComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";

type DecideLikeProps = NativeStackScreenProps<LikesStackParamList, 'DecideLike'>;

const DecideLike = ({navigation, route}:DecideLikeProps) => {
    const profile = {
        id:1,
        first_name:'Kartik',
        last_name:'Sharma',
        gender:'Male',
        age:19,
        home_town:'Maharashtra',
        religion:'Hindu',
        open_for:'Long-term relationship',
        preferred_gender:'Female',
        images:[
            'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ,'https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ,'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ,'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ,'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ,'https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        prompts:[
            {
                question:'A life goal of mine',
                answer:'I want to become an successful businessman'
            },
            {
                question:'I feel most supported when',
                answer:'Someone can sit with me 😇 ❤️'
            },
            {
                question:'I want someone who',
                answer:'Can understand me ❤️'
            }
        ]
    }
    const [isModalVisible , setIsModalVisible] = useState(false);

    const handleChat = ()=>{
        setIsModalVisible(!isModalVisible);
    }

    return (
        <>
        <ScrollView style={styles.container}>
            <View style={{position:'relative'}}>
                { route.params?.likedType === 'photo' ?
                    <ImageLiked url={route.params?.image?.url!}/>
                    :
                    <AnswerLiked question={route.params?.behaviour?.question!} answer={route.params?.behaviour?.answer!}/>
                }
                <View style={{position:'absolute' , bottom:-15 , left:-10 , width:'100%'}}>
                    <LikedComponent 
                        item={route.params?.likedType}
                        backgroundColor='#f7d7cd'
                        parentBackgroundColor='#F2F1EF'
                        textColor='#666666'
                    />
                </View>
            </View>
            <ProfileDisplay profile={profile} show={false}/>
        </ScrollView>
        <Modal 
            isVisible={isModalVisible}
            
        >
            <View style={{ flex: 1 , marginTop:'50%' , backgroundColor:'#ecf0f1', borderRadius:10, paddingHorizontal:8}}>
                <View style={{position:'relative'}}>
                    { route.params?.likedType === 'photo' ?
                        <ImageLiked url={route.params?.image?.url!}/>
                        :
                        <AnswerLiked question={route.params?.behaviour?.question!} answer={route.params?.behaviour?.answer!}/>
                    }
                    <View style={{position:'absolute' , bottom:-15 , left:-10 , width:'100%'}}>
                        <LikedComponent 
                            item={route.params?.likedType}
                            backgroundColor='#f7d7cd'
                            parentBackgroundColor='#ecf0f1'
                            textColor='#666666'
                        />
                    </View>
                </View>
                <TextInput
                    placeholder="Send a message"
                    placeholderTextColor="#A4B0BD"
                    multiline={true}
                    editable={true}
                    
                    style={{
                        height:50,
                        backgroundColor:'#fff',
                        marginTop:25,
                        borderRadius:10,
                        fontFamily:'ModernEra-Medium',
                        color:'#000000',
                        paddingLeft:10,
                        fontSize:20,
                    }}
                />
                <Pressable 
                    
                    onPress={handleChat}
                    style={{
                        marginTop:25,
                        width:'100%',
                        paddingHorizontal:30,
                    }} 
                >
                    <Text 
                    style={{
                        fontFamily:'ModernEra-Bold' ,
                        backgroundColor:'#66295B',
                        textAlign:'center',
                        color:'#fff',
                        borderRadius:100,
                        paddingVertical:10,
                        fontSize:20,
                    }}
                    >Match</Text>
                </Pressable>
                <Pressable 
                    
                    onPress={handleChat}
                    style={{
                        marginTop:15,
                        width:'100%',
                        paddingHorizontal:30,
                    }} 
                >
                    <Text 
                    style={{
                        fontFamily:'ModernEra-Bold' ,
                        textAlign:'center',
                        color:'#000000',
                        borderRadius:100,
                        paddingVertical:10,
                        fontSize:20,
                    }}
                    >Cancel</Text>
                </Pressable>
            </View>
        </Modal>
        <Pressable
            // onPress={handleCross}
            style={{
                position: 'absolute',
                bottom: 15,
                left: 30,
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 1, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.4,
                elevation: 5,
            }}>
            <MaterialCommunityIcons name="sword-cross" size={30} color="#000000" />
        </Pressable>
        <Pressable
            onPress={handleChat}
            style={{
                position: 'absolute',
                bottom: 15,
                right: 30,
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: {width: 1, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.4,
                elevation: 5,
            }}>
            <MaterialIcons name="chat-bubble-outline" size={30} color="#66295B" />
        </Pressable>
        </>
    )
}


const ImageLiked = ({url}:{url:string})=>{
    return (
        <View>
            <Image
                source={{
                    uri:url
                }}
                style={styles.imageStyle}
            />
        </View>
    )
}

const AnswerLiked = ({question,answer}:{question:string,answer:string})=>{
    return (
        <View style={styles.promptContainer}>
            <Text style={styles.promptQuestion}>{question}</Text>
            <Text style={styles.promptAnswer}>{answer}</Text>
        </View>
    )
}


export default DecideLike

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2F1EF',
        position:'relative',
        paddingHorizontal:25,
    },
    promptContainer:{
        display:'flex',
        height:'auto',
        gap:10,
        borderRadius:10,
        backgroundColor:'white',
        marginTop:20,
        marginBottom:10,
        paddingLeft:15,
        paddingRight:30,
        paddingVertical:40,
    },
    promptQuestion:{
        fontFamily:'ModernEra-Bold',
        fontSize:15,
    },
    promptAnswer:{
        fontFamily:'TiemposHeadline-Semibold',
        fontSize:25,
        lineHeight:30,
    },
    imageStyle:{
        width:'100%',
        height:150,
        marginTop:20,
        marginBottom:10,
        borderRadius:10,
        resizeMode:'cover',
    },
})