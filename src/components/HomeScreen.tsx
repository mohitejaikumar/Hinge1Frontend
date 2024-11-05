import {  Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabsParamList } from '../navigation/MainStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileDisplay from './ProfileDisplay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../hooks/useToken';


type HomeScreenProps = NativeStackScreenProps<BottomTabsParamList, 'Home'>;

const HomeScreen = ({route,navigation}:HomeScreenProps) => {

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
    const [matches , setMatches] = useState([]);
    const [loading , setLoading] = useState(false);
    const {token} = useToken();
    
    const getMatch = async()=>{

        setLoading(true);
        try{
            const response = await axios.get('http://10.81.4.206:3000/users/matches',{
                headers:{
                    authorization: token
                }
            });
            setMatches(response.data);
            console.log(response.data[0]);
        }
        catch(err){
            console.error(err);
        }
        setLoading(false);
    }


    useEffect(()=>{
        getMatch();
    },[])

    
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
                <ProfileDisplay profile={profile} show={true}/>

        </ScrollView>
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