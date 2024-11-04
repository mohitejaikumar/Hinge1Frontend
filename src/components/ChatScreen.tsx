import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList, MainStackParamList } from '../navigation/MainStack';
import { useNavigation } from '@react-navigation/native';


const ChatScreen = () => {
    const navigation = useNavigation();
    const people =[
        {
            id:1,
            first_name:'kartik',
            image:'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            last_messsage:'Hey, I like your photo!ewfwfwefewfewfefwfwffwfwefwfewf'
        },
        {
            id:1,
            first_name:'kartik',
            image:'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            last_messsage:'Hey, I like your photo!ewfwfwefewfewfefwfwffwfwefwfewf'
        },
        {
            id:1,
            first_name:'kartik',
            image:'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            last_messsage:'Hey, I like your photo!ewfwfwefewfewfefwfwffwfwefwfewf'
        }
    ]
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
                                    navigation.navigate('MainChatScreen',
                                        {
                                            id:person.id , 
                                            first_name:person.first_name
                                        },
                                        
                                    )
                                }}
                            >
                                <Image 
                                    source={{
                                        uri:person.image
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
                                    <Text>{person.last_messsage.slice(0,20)}..</Text>
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