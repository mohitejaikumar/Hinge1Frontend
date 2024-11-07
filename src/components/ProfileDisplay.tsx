import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Profile } from '../types';
import Modal from "react-native-modal";
import { AnswerLiked, ImageLiked } from './CustomizedLikedComponent';
import LikedComponent from './LikedComponent';


const ProfileDisplay = ({
    profile, 
    show,
    onLike,
}:{
    profile:Profile,
    show:boolean,
    onLike?:(userId:number, likedType:'photo'|'answer', id:number , comment:string)=>void,
}) => {
    const [isModalVisible , setIsModalVisible] = useState(false);
    const [likedType , setLikedType] = useState<'photo'|'answer'|null>(null);
    const [image , setImage] = useState<string|null>(null);
    const [behaviour , setBehaviour] = useState<{question:string, answer:string}|null>(null);
    const [likedId, setLikedId] = useState<number|null>(null);
    const [comment,setComment] = useState('');

    const handleSubmit = ()=>{
        if(onLike){
            onLike(profile.id, likedType!, likedId!,comment);
            setIsModalVisible(!isModalVisible);
        }
    }
    
    const handleImageLike = async(likedType:'photo'|'answer', image:string, id:number)=>{
        setLikedType(likedType);
        setImage(image);
        setLikedId(id);
        setIsModalVisible(!isModalVisible);
    }
    const handleAnswerLike = async(likedType:'photo'|'answer', id:number, behaviour:{question:string, answer:string})=>{
        setLikedType(likedType);
        setBehaviour(behaviour);
        setLikedId(id);
        setIsModalVisible(!isModalVisible);
    }
    const handleCancel = ()=>{
        setIsModalVisible(!isModalVisible);
    }

    return (
        <>
        <ScrollView>
                <Text style={styles.firstName}>{profile.first_name}</Text>
                <View>
                    <Image
                        source={{
                            uri:profile.images[0].url
                        }}
                        style={styles.imageStyle}
                    />
                    {show && <Pressable
                        style={styles.heartIcon}
                        onPress={()=>handleImageLike('photo',profile.images[0].url , profile.images[0].id)}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                    }
                </View>
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.behaviour[0].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.behaviour[0].answer}</Text>
                    {show && <Pressable
                        style={styles.promptHeartIcon}
                        onPress={()=>handleAnswerLike('answer', profile.behaviour[0].id,profile.behaviour[0])}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                    }
                </View>
                <View style={styles.infoContainer}>
                    <View 
                    style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-evenly',paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#DAE0E2'}}>
                        <View style={{display:'flex', flexDirection:'row', width:'25%' , gap:15}}>
                            <Entypo name="cake" size={20} color="#000000" />
                            <Text>{profile.age}</Text>
                        </View>
                        <View style={{display:'flex', flexDirection:'row', width:'30%' , gap:15}}>
                            <Ionicons name="person-outline" size={25} color="#000000" />
                            <Text>{profile.gender}</Text>
                        </View>
                        <View style={{display:'flex', flexDirection:'row',width:'30%' ,gap:15}}>
                            <Ionicons name="magnet-outline" size={25} color="#000000" />
                            <Text>Straight</Text>
                        </View>
                    </View>
                    <View style={styles.infoSection}>
                        <Entypo name="heart-outlined" size={28} color="#000000" style={{width:'10%'}}/>
                        <Text>{profile.preferred_gender}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Octicons name="book" size={25} color="#000000" style={{width:'10%'}} />
                        <Text>{profile.religion}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Ionicons name="home-outline" size={25} color="#000000"  style={{width:'10%'}}/>
                        <Text>{profile.home_town}</Text>
                    </View>
                    <View style={[styles.infoSection,{borderBottomWidth:0}]}>
                        <Feather name="search" size={25} color="#000000"  style={{width:'10%'}}/>
                        <Text>{profile.dating_type}</Text>
                    </View>
                </View>
                {
                    profile.images.slice(1,3).map((image:{id:number, url:string},index:number)=>{
                        return (
                            <View key={index}>
                                <Image
                                    source={{
                                        uri:image.url
                                    }}
                                    style={styles.imageStyle}
                                />
                                {show &&<Pressable
                                    style={styles.heartIcon}
                                    onPress={()=>handleImageLike('photo',image.url , image.id)}
                                >
                                    <AntDesign name="hearto" size={25} color="#C5B358" />
                                </Pressable>}
                            </View>
                        )
                    })
                }
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.behaviour[1].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.behaviour[1].answer}</Text>
                    {show &&<Pressable
                        style={styles.promptHeartIcon}
                        onPress={()=>handleAnswerLike('answer', profile.behaviour[1].id,profile.behaviour[1])}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                <View>
                    <Image
                        source={{
                            uri:profile.images[3].url
                        }}
                        style={styles.imageStyle}
                    />
                    {show && <Pressable
                        style={styles.heartIcon}
                        onPress={()=>handleImageLike('photo',profile.images[3].url , profile.images[3].id)}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.behaviour[2].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.behaviour[2].answer}</Text>
                    {show && <Pressable
                        style={styles.promptHeartIcon}
                        onPress={()=>handleAnswerLike('answer', profile.behaviour[2].id,profile.behaviour[2])}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                {
                    profile.images.slice(4,6).map((image:{id:number, url:string},index:number)=>{
                        return (
                            <View key={index}>
                                <Image
                                    source={{
                                        uri:image.url
                                    }}
                                    style={styles.imageStyle}
                                />
                                {show && <Pressable
                                    style={styles.heartIcon}
                                    onPress={()=>handleImageLike('photo',image.url , image.id)}
                                >
                                    <AntDesign name="hearto" size={25} color="#C5B358" />
                                </Pressable>}
                            </View>
                        )
                    })
                }
        </ScrollView>
        {/* This modal is for Home Screen */}
        <Modal 
            isVisible={isModalVisible}
            
            
        >
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{  marginTop:'10%' , backgroundColor:'#ecf0f1', borderRadius:10, paddingHorizontal:10 , width:'100%'}}>
                <Text style={styles.firstName}>{profile.first_name}</Text>
                <View style={{position:'relative'}}>
                    { likedType === 'photo' ?
                        <ImageLiked url={image!}/>
                        :
                        <AnswerLiked question={behaviour?.question!} answer={behaviour?.answer!}/>
                    }
                    <View style={{position:'absolute' , bottom:-15 , left:-10 , width:'100%'}}>
                        <LikedComponent 
                            item={likedType!}
                            backgroundColor='#f7d7cd'
                            parentBackgroundColor='#ecf0f1'
                            textColor='#666666'
                        />
                    </View>
                </View>
                <TextInput
                    placeholder="Add a comment"
                    placeholderTextColor="#A4B0BD"
                    multiline={true}
                    editable={true}
                    onChangeText={(text)=>setComment(text)}
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
                    
                    onPress={handleSubmit}
                    style={{
                        marginTop:25,
                        width:'100%',
                        paddingHorizontal:30,
                    }} 
                >
                    <Text 
                    style={{
                        fontFamily:'ModernEra-Bold' ,
                        backgroundColor:'#f7d7cd',
                        textAlign:'center',
                        color:'#000000',
                        borderRadius:100,
                        paddingVertical:10,
                        fontSize:20,
                    }}
                    >Send Like</Text>
                </Pressable>
                <Pressable 
                    
                    onPress={handleCancel}
                    style={{
                        marginVertical:10,
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
            </KeyboardAvoidingView>
        </Modal>
        </>
    )
}

export default ProfileDisplay

const styles = StyleSheet.create({
    firstName:{
        fontSize:30,
        fontFamily:'ModernEra-Bold',
        marginTop:20,
    },
    imageStyle:{
        width:'100%',
        height:400,
        marginTop:20,
        marginBottom:10,
        borderRadius:10,
        resizeMode:'cover',

    },
    heartIcon:{
        position: 'absolute',
        bottom: 15,
        right: 10,
        backgroundColor: 'white',
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    promptHeartIcon:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'white',
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.4,
        // Shadow properties for Android
        elevation: 5,
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
    infoContainer:{
        width:'100%',
        borderRadius:10,
        backgroundColor:'white',
        marginTop:20,
        paddingHorizontal:15,
        paddingVertical:10
    },
    infoSection:{
        flexDirection:'row',
        gap:10,
        marginTop:20 , 
        paddingBottom:10, 
        borderBottomWidth:1, 
        borderBottomColor:'#DAE0E2'
    }
})
