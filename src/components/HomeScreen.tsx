import {  ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList } from '../navigation/MainStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileDisplay from './ProfileDisplay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { Profile } from '../types';
import { useFocusEffect } from '@react-navigation/native';



type HomeScreenProps = NativeStackScreenProps<BottomTabsParamList, 'Home'>;



const HomeScreen = ({route,navigation}:HomeScreenProps) => {

    const [matches , setMatches] = useState<Profile[]>([]);
    const [loading , setLoading] = useState(false);
    const {token} = useToken();
    const [tried, setTried] = useState(false);
    
    const getMatch = async()=>{
        setLoading(true);
        try{
            const response = await axios.get('http://10.81.4.206:3000/users/matches',{
                headers:{
                    authorization: token
                }
            });
            // console.log(JSON.stringify(response.data));
            if(response.data){
            
                setMatches((prev)=>[...prev,...response.data]);
                setTried(true);
            }
            
        }
        catch(err){
            console.error(err);
        }
        setLoading(false);
    }


    useFocusEffect(
        useCallback(()=>{
            if(matches.length === 0 && !tried){
                getMatch();
            }
        },[matches , tried])
    );
    
    

    const onLike = async(userId:number, likedType:'photo'|'answer', id:number , comment:string)=>{
        // console.log('liked' , userId , likedType , id , comment);
        
        // like api call
        if(likedType === 'photo'){
            try{
                await axios.post('http://10.81.4.206:3000/users/imageLiked',{
                    likedUserId:userId,
                    imageId:id,
                    comment:comment
                },{
                    headers:{
                        authorization:token,
                        'Content-Type': 'application/json'
                    }
                });
                // shift to next
                setMatches((prev)=>prev.slice(1));
                setTried(false);
            }
            catch(err){
                //@ts-ignore
                console.error(err.message);
            }
        }
        else{
            try{
                await axios.post('http://10.81.4.206:3000/users/behaviourLiked',{
                    likedUserId:userId,
                    behaviourId:id,
                    comment:comment
                },{
                    headers:{
                        authorization:token
                    }
                });

                // shift to next
                setMatches((prev)=>prev.slice(1));
                setTried(false);
            }
            catch(err){
                console.error(err);
            }
        }
    }

    const onReject = async(userId:number)=>{
        // console.log('rejected');
        
        // reject api call 
        try{
            await axios.post('http://10.81.4.206:3000/users/reject',{
                rejectedUserId:userId
            },{
                headers:{
                    authorization:token
                }
            })
            // shift to next
            setMatches((prev)=>prev.slice(1));
            setTried(false);
        }
        catch(err){
            console.error(err);
        }
    }
    
    
    return (
        <>
        <ScrollView style={styles.container}>
                <View style={styles.heroContainer}>
                    <View style={styles.logoBorder}>
                        <AntDesign name="hearto" size={23} color="#66295B" />
                    </View>
                    <View>
                        <Text style={{fontFamily:'ModernEra-Bold'}}>Learning your type.</Text>
                        <Text style={{fontFamily:'ModernEra-Medium'}}>One like goes a long way.</Text>
                    </View>
                </View>
                { !loading && matches.length === 0 &&
                    <View style={{marginTop:'70%'}}>
                        <Text style={{fontFamily:'ModernEra-Bold' , fontSize:30 , textAlign:'center'}}>No Match Found 🥺</Text>
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
                {!loading && matches.length >0 && 
                    <ProfileDisplay profile={matches[0]} show={true} onLike={onLike}/>
                }

        </ScrollView>
        { !loading && matches.length > 0 &&
            <Pressable
            onPress={()=>onReject(matches[0].id)}
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
        }
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EEEEEE',
        position:'relative',
        paddingHorizontal:25,
    },
    heroContainer:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:'#D3BCEB',
        marginTop:10,
        height:70,
        gap:15,
    },
    logoBorder:{
        borderWidth:3,
        borderColor:'#66295B',
        borderRadius:100,
        width:40,
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
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

//#EADDD8