import { ActivityIndicator, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LikesStackParamList } from '../navigation/MainStack';
import ProfileDisplay from './ProfileDisplay';
import LikedComponent from './LikedComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
import { AnswerLiked, ImageLiked } from './CustomizedLikedComponent';
import { Profile } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useToken } from '../hooks/useToken';

type DecideLikeProps = NativeStackScreenProps<LikesStackParamList, 'DecideLike'>;

const DecideLike = ({navigation, route}:DecideLikeProps) => {
    
    const {token} = useToken();
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isModalVisible , setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChat = async()=>{
        // Chat logic
        // add user to match list
        try{
            await axios.post('http://10.81.4.206:3000/users/accept',{
                acceptedUserId:route.params?.id
            },{
                headers:{
                    authorization:token
                }
            })
            // shift to next
            route.params?.goToNext();
            navigation.goBack();
            navigation.goBack();
            setIsModalVisible(!isModalVisible);
        }
        catch(err){
            console.error(err);
        }
        

    }
    const handleCross = async()=>{

        try{
            await axios.post('http://10.81.4.206:3000/users/reject',{
                rejectedUserId:route.params?.id
            },{
                headers:{
                    authorization:token
                }
            })
            // shift to next
            route.params?.goToNext();
            navigation.goBack();
        }
        catch(err){
            console.error(err);
        }
    }
    const handleCancel = ()=>{
        setIsModalVisible(!isModalVisible);
    }

    const getProfile = async()=>{
        setLoading(true);
        try{
            const response = await axios.get(`http://10.81.4.206:3000/users/profile/${route.params?.id}`,{
                headers:{
                    authorization:token
                }
            });
            if(response.data){
                setProfile(response.data);
            }
        }
        catch(err){
            console.error(err);
            navigation.goBack();
        }
        setLoading(false);
    }

    
    useEffect(()=>{
        getProfile();
    },[])

    return (
        <>
        <ScrollView style={styles.container}>
            {profile && !loading && <View style={{position:'relative'}}>
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
            }
            {loading && 
                    <View style={{marginTop:'60%'}}>
                        <ActivityIndicator
                            size="large"
                            color="#66295B"
                        />
                    </View>
            }
            {profile && !loading && <ProfileDisplay profile={profile} show={false}/>}
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
                    onChangeText={(text)=>setMessage(text)}
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
                    
                    onPress={handleCancel}
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
            onPress={handleCross}
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


export default DecideLike

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2F1EF',
        position:'relative',
        paddingHorizontal:25,
    },
})