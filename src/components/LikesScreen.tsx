import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LikedComponent from './LikedComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LikesStackParamList } from '../navigation/MainStack';


interface LikedBy{
    behaviour?:{
        question:string,
        answer:string
    },
    image?:{
        url:string
    },
    by_user:{
        id:number,
        first_name:string,
        images:string[]
    }
}
type LikesScreenProps = NativeStackScreenProps<LikesStackParamList, 'LikeScreen'>;

const LikesScreen = ({navigation}:LikesScreenProps) => {

    const likedBy:LikedBy[] = [{
        behaviour:{
            question:'What is your favourite thing about this person?',
            answer:'I like their smile'
        },
        image:{
            url:'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        by_user:{
            id:1,
            first_name:'Kartik',
            images:[
                'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]
        }
    },
    {
        behaviour:{
            question:'What is your favourite thing about this person?',
            answer:'I like their smile'
        },
        image:{
            url:'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        by_user:{
            id:1,
            first_name:'Kartik',
            images:[
                'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]
        }
    },
    {
        behaviour:{
            question:'What is your favourite thing about this person?',
            answer:'I like their smile'
        },
        image:{
            url:'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        by_user:{
            id:1,
            first_name:'Kartik',
            images:[
                'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1508243771214-6e95d137426b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ,'https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]
        }
    }
]



    return (
        <ScrollView style={styles.container}>
            <View style={styles.heroSection}>
                <Text style={{fontFamily:'ModernEra-Bold' , fontSize:30}}>Likes You</Text>
                <View style={{display:'flex' , flexDirection:'row' , gap:8, paddingHorizontal:15 , paddingVertical:12 , backgroundColor:'#b4debe', borderRadius:20}}>
                    <MaterialIcons name="electric-bolt" size={20} color="#000000" />
                    <Text style={{fontFamily:'ModernEra-Bold' , fontSize:15}}>Boost</Text>
                </View>
            </View>
            <Pressable 
            style={styles.firstLikeContainer} 
            onPress={()=>navigation.push('DecideLike',{
                id:likedBy![0].by_user.id,
                likedType:(likedBy![0].behaviour ? 'answer' : 'photo'),
                behaviour:(likedBy![0].behaviour ? likedBy![0].behaviour : undefined),
                image:(likedBy![0].image ? likedBy![0].image : undefined)
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
                        uri:likedBy![0].by_user.images[0],
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
                                image:(item.image ? undefined : likedBy![0].image)
                            })}
                        >
                            <Text style={styles.likedComponent}>
                                Liked your {item.behaviour ? 'answer' : 'photo'}
                            </Text>
                            <Text style={styles.firstName}>{item.by_user.first_name}</Text>
                            <Image 
                                source={{
                                    uri:item.by_user.images[1],
                                }}
                                style={styles.smallImage}
                            />
                        </Pressable>
                    )
                })
                }
            </View>
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