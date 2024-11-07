import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LikedComponent from './LikedComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LikesStackParamList } from '../navigation/MainStack';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useToken } from '../hooks/useToken';


interface LikedBy{
    behaviour?:{
        question:string,
        answer:string,
        id:number
    },
    image?:{
        url:string,
        id:number
    },
    by_user:{
        id:number,
        first_name:string,
        images:{
            url:string
        }[]
    }
}
type LikesScreenProps = NativeStackScreenProps<LikesStackParamList, 'LikeScreen'>;

const LikesScreen = ({navigation}:LikesScreenProps) => {

    const {token} = useToken();
    const [likedBy , setLikedBy] = useState<LikedBy[]>([]);
    const [loading, setLoading] = useState(false);
    const [tried, setTried] = useState(false);

    const getAllLikes = async ()=>{
        setLoading(true);
        try{
            const response = await axios.get('http://10.81.4.206:3000/users/allLikes',{
                headers:{
                    authorization:token
                }
            });
            console.log(response.data);
            setLikedBy(response.data);
            setTried(true);
        }
        catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useFocusEffect(
        useCallback(()=>{
            if(likedBy.length === 0 && !tried){
                getAllLikes();
            }
        },[])
    )
    
    const goToNext = ()=>{
        setLikedBy((prev)=>prev.slice(1));
        setTried(false);
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.heroSection}>
                <Text style={{fontFamily:'ModernEra-Bold' , fontSize:30}}>Likes You</Text>
                <View style={{display:'flex' , flexDirection:'row' , gap:8, paddingHorizontal:15 , paddingVertical:12 , backgroundColor:'#b4debe', borderRadius:20}}>
                    <MaterialIcons name="electric-bolt" size={20} color="#000000" />
                    <Text style={{fontFamily:'ModernEra-Bold' , fontSize:15}}>Boost</Text>
                </View>
            </View>
            {loading && 
                    <View style={{marginTop:'60%'}}>
                        <ActivityIndicator
                            size="large"
                            color="#66295B"
                        />
                    </View>
            }
            { !loading && likedBy.length === 0 &&
                <View style={{marginTop:'70%'}}>
                    <Text style={{fontFamily:'ModernEra-Bold' , fontSize:30 , textAlign:'center'}}>No Like Found 🥺</Text>
                </View>
            }
            { !loading && likedBy.length > 0 &&
                <>
                <Pressable 
                    style={styles.firstLikeContainer} 
                    onPress={()=>navigation.push('DecideLike',{
                        id:likedBy![0].by_user.id,
                        likedType:(likedBy![0].behaviour ? 'answer' : 'photo'),
                        behaviour:(likedBy![0].behaviour ? likedBy![0].behaviour : undefined),
                        image:(likedBy![0].image ? likedBy![0].image : undefined),
                        goToNext:goToNext
                    })}>
                        <LikedComponent 
                            item={likedBy![0].behaviour ? 'answer' : 'photo'}
                            backgroundColor='#E8E8E8'
                            parentBackgroundColor='white'
                            textColor='#666666'
                        />
                        <Text style={styles.firstName} >{likedBy![0].by_user.first_name}</Text>
                        <Image 
                            source={{
                                uri:likedBy![0].by_user.images[0].url,
                            }}
                            style={{
                                width:'100%',
                                height:380,
                                position:'absolute',
                                resizeMode:'cover',
                                bottom:0,
                                left:0,
                                right:0,
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                            }}
                        />
                    </Pressable>
                    <View style={{marginTop:30 , paddingHorizontal:20}}>
                        <Text style={{fontFamily:'ModernEra-Bold' , fontSize:20}}>Up next</Text>
                        <Text style={{fontFamily:'ModernEra-Medium' , fontSize:13 , color:'#9C9C9C'}}>
                            Subscribe to see everyone who likes you
                        </Text>
                    </View>
                    <View style={{display:'flex', flexDirection:'row' , flexWrap:'wrap' , gap:6 , width:'100%' , justifyContent:'center' , marginBottom:50}}>
                        { likedBy.slice(1,4).map((item,index)=>{
                            return (
                                <Pressable style={styles.smallContainer} key={index} 
                                    onPress={()=>navigation.push('DecideLike',{
                                        id:item.by_user.id,
                                        likedType:(item.behaviour ? 'answer' : 'photo'),
                                        behaviour:(item.behaviour ? likedBy![0].behaviour : undefined),
                                        image:(item.image ? undefined : likedBy![0].image),
                                        goToNext:goToNext
                                    })}
                                >
                                    <Text style={styles.likedComponent}>
                                        Liked your {item.behaviour ? 'answer' : 'photo'}
                                    </Text>
                                    <Text style={styles.firstName}>{item.by_user.first_name}</Text>
                                    <Image 
                                        source={{
                                            uri:item.by_user.images[1].url,
                                        }}
                                        style={styles.smallImage}
                                    />
                                </Pressable>
                            )
                        })
                        }
                </View>
                </>
            }
            
        </ScrollView>
    );
}

export default LikesScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'relative',
        paddingHorizontal:15,
    },
    heroSection:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:40,
    },
    firstLikeContainer:{
        height:500,
        width:'100%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#DADADA',
        marginTop:25
    },
    firstName:{
        fontSize:25,
        fontFamily:'ModernEra-Bold',
        marginTop:10,
        marginLeft:10
    },
    smallContainer:{
        height:300,
        width:'49%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#DADADA',
        marginTop:25,
    },
    likedComponent:{
        fontStyle:'italic' , 
        color:'#666666' , 
        fontFamily:'ModernEra-Medium' , 
        borderBottomWidth:1,
        paddingBottom:10,
        fontSize:15,
        marginLeft:10,
        marginTop:10,
        borderColor:'#DADADA',
    },
    smallImage:{
        width:'100%',
        height:200,
        position:'absolute',
        resizeMode:'cover',
        bottom:0,
        left:0,
        right:0,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    }
})