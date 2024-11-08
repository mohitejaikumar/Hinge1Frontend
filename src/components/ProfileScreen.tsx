import {  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList } from '../navigation/MainStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileDisplay from './ProfileDisplay';
import {  useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import { Profile } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';




type ProfileScreenProps = NativeStackScreenProps<BottomTabsParamList, 'Profile'>;




const ProfileScreen = ({route,navigation}:ProfileScreenProps) => {

    const [loading , setLoading] = useState(false);
    const {token,setToken} = useToken();
    const [profile , setProfile] = useState<Profile|null>(null);
    
    const getProfile = async()=>{
        setLoading(true);
        try{
            const response = await axios.get('http://10.81.4.206:3000/users/me',{
                headers:{
                    authorization: token
                }
            });
            console.log(JSON.stringify(response.data));
            if(response.data){
            
                setProfile(response.data);
            }
            
        }
        catch(err){
            console.error(err);
        }
        setLoading(false);
    }


    useEffect(()=>{
        getProfile();
    },[]);

    const onLogOut = async()=>{
        await AsyncStorage.removeItem('token');
        setToken('');
    }
    
    return (
        <>
        <ScrollView style={styles.container}>
                {loading && 
                    <View style={{marginTop:'60%'}}>
                        <ActivityIndicator
                            size="large"
                            color="#66295B"
                        />
                    </View>
                }
                <Pressable style={{marginTop:10, flexDirection:'row', justifyContent:'flex-end' }}>
                    <Text 
                    style={{color:'white' , textAlign:'right' , backgroundColor:'#66295B' , paddingHorizontal:20 , paddingVertical:10 , borderRadius:10}}
                    onPress={onLogOut}
                    >
                        LogOut
                    </Text>
                </Pressable>
                {!loading && profile && 
                    <ProfileDisplay profile={profile} show={false}/>
                }
        </ScrollView>
        </>
    );
}

export default ProfileScreen;

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