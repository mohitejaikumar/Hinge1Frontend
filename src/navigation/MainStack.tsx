import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import LikesScreen from '../components/LikesScreen';
import ChatScreen from '../components/ChatScreen';
import ProfileScreen from '../components/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DecideLike from '../components/DecideLike';
import MainChatScreen from '../components/MainChatScreen';


export type MainStackParamList = {
    Main:undefined
    MainChatScreen:{
        id:number,
        first_name:string
    },
}

export type BottomTabsParamList ={
    Home:undefined;
    Likes:undefined;
    Chat:undefined;
    Profile:undefined;
}
export type LikesStackParamList = {
    LikeScreen:undefined,
    DecideLike:{
        id:number,
        likedType:'photo'|'answer',
        behaviour?:{
            question:string,
            answer:string
        },
        image?:{
            url:string
        },
    }
}

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const LikesStack = createNativeStackNavigator<LikesStackParamList>();


const LikesScreenStack = ()=>{
    return (
        <LikesStack.Navigator initialRouteName='LikeScreen'>
            <LikesStack.Screen 
                name="LikeScreen" 
                component={LikesScreen}
                options={{headerShown:false}}
            />
            <LikesStack.Screen 
                name="DecideLike" 
                component={DecideLike}
                options={{headerShown:false}}
            />
        </LikesStack.Navigator>
    )
}

const BottomTabs = ()=>{
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarLabelStyle: {color: '#008E97'},
                tabBarStyle: {backgroundColor: '#101010'},
                tabBarIcon: ({focused})=>(
                    focused ? (
                    <MaterialCommunityIcons 
                    name="alpha" 
                    size={35} 
                    color="white" 
                    />
                ) : (
                    <MaterialCommunityIcons
                    name="alpha"
                    size={35}
                    color="#989898"
                    />
                ))
            }}
            />
            <Tab.Screen 
            name="Likes" 
            component={LikesScreenStack}
            options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: {backgroundColor: '#101010'},
                tabBarLabelStyle: {color: '#008E97'},
                tabBarIcon: ({focused}) =>
                    focused ? (
                        <Entypo name="heart" size={30} color="white" />
                    ) : (
                        <Entypo name="heart" size={30} color="#989898" />
                    ),
            }}
            />
            <Tab.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: {backgroundColor: '#101010'},
                // tabBarLabelStyle: {color: '#008E97'},
                tabBarIcon: ({focused}) =>
                    focused ? (
                        <MaterialIcons
                        name="chat-bubble-outline"
                        size={30}
                        color="white"
                        />
                    ) : (
                        <MaterialIcons
                        name="chat-bubble-outline"
                        size={30}
                        color="#989898"
                        />
                    ),
            }}
            />
            <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: {backgroundColor: '#101010'},
                tabBarIcon: ({focused}) =>
                    focused ? (
                        <Ionicons
                        name="person-circle-outline"
                        size={30}
                        color="white"
                        />
                    ) : (
                        <Ionicons
                        name="person-circle-outline"
                        size={30}
                        color="#989898"
                        />
                    ),
            }} 
            />
        </Tab.Navigator>
    )
}


const MainStack = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Main" 
            component={BottomTabs}
            options={{headerShown:false}}
            />
            <Stack.Screen 
            name="MainChatScreen" 
            component={MainChatScreen}
            />

        </Stack.Navigator>
    );
};

export default MainStack;

const styles = StyleSheet.create({});