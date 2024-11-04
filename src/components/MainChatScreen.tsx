import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MainStackParamList } from '../navigation/MainStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'

type MainChatScreenProps = NativeStackScreenProps<MainStackParamList, 'MainChatScreen'>;

const MainChatScreen = ({navigation,route}:MainChatScreenProps) => {
    
    const [inputHeight,setInputHeight] = useState(30);
    const [messages, setMessages] = useState([
        
    ])

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:route.params?.first_name,
            headerTitleStyle:{
                fontFamily:'ModernEra-Bold',
                fontSize:25,
            }
        })
    },[])
    return (
        <>
        <ScrollView style={styles.container}>
            
        </ScrollView>
        <View style={styles.bottomBar}>
                <TextInput
                    placeholder="Send a message"
                    placeholderTextColor="#7f8c8d"
                    multiline={true}
                    numberOfLines={4}
                    scrollEnabled={true}
                    onContentSizeChange={(e)=>{
                        setInputHeight(e.nativeEvent.contentSize.height);
                    }}
                    style={{
                        fontFamily:'ModernEra-Medium',
                        color:'#000000',
                        fontSize:18,
                        alignSelf:'stretch',
                        paddingHorizontal:25,
                        paddingVertical:15,
                        width:'80%',
                        height:Math.min(inputHeight,100),
                        borderWidth:1,
                        borderColor:'#95a5a6',
                        borderRadius:100,
                    }}
                />
                <View
                style={{
                    width:50,
                    height:50,
                    backgroundColor:'#66295B',
                    borderRadius:100,
                    justifyContent:'center',
                    alignItems:'center',
                }}
                >
                    <AntDesign
                        name="arrowup"
                        size={25}
                        color="white"
                    />
                </View>
                
        </View>
        </>
    )
}

export default MainChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        paddingHorizontal:25,
    },
    bottomBar:{
        position:'absolute',
        bottom:10,
        right:0,
        left:15,
        color:'#000000',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        gap:10,
    }
})