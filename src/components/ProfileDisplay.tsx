import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileDisplay = ({profile , show}:any) => {
    return (
        <ScrollView>
                <Text style={styles.firstName}>{profile.first_name}</Text>
                <View>
                    <Image
                        source={{
                            uri:profile.images[0]
                        }}
                        style={styles.imageStyle}
                    />
                    {show && <Pressable
                        style={styles.heartIcon}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                    }
                </View>
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.prompts[0].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.prompts[0].answer}</Text>
                    {show && <Pressable
                        style={styles.promptHeartIcon}
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
                        <Text>{profile.open_for}</Text>
                    </View>
                </View>
                {
                    profile.images.slice(1,3).map((image:string,index:number)=>{
                        return (
                            <View key={index}>
                                <Image
                                    source={{
                                        uri:image
                                    }}
                                    style={styles.imageStyle}
                                />
                                {show &&<Pressable
                                    style={styles.heartIcon}
                                >
                                    <AntDesign name="hearto" size={25} color="#C5B358" />
                                </Pressable>}
                            </View>
                        )
                    })
                }
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.prompts[1].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.prompts[1].answer}</Text>
                    {show &&<Pressable
                        style={styles.promptHeartIcon}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                <View>
                    <Image
                        source={{
                            uri:profile.images[3]
                        }}
                        style={styles.imageStyle}
                    />
                    {show && <Pressable
                        style={styles.heartIcon}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                <View style={styles.promptContainer}>
                    <Text style={styles.promptQuestion}>{profile.prompts[2].question}</Text>
                    <Text style={styles.promptAnswer}>{profile.prompts[2].answer}</Text>
                    {show && <Pressable
                        style={styles.promptHeartIcon}
                    >
                        <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>}
                </View>
                {
                    profile.images.slice(4,6).map((image:string,index:number)=>{
                        return (
                            <View key={index}>
                                <Image
                                    source={{
                                        uri:image
                                    }}
                                    style={styles.imageStyle}
                                />
                                {show && <Pressable
                                    style={styles.heartIcon}
                                >
                                    <AntDesign name="hearto" size={25} color="#C5B358" />
                                </Pressable>}
                            </View>
                        )
                    })
                }
        </ScrollView>
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
