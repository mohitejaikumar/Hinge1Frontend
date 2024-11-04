import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';

type NameScreenProps = NativeStackScreenProps<AuthStackParamList, 'NameScreen'>;

const NameScreen = ({navigation}:NameScreenProps) => {
    const firstNameRef = useRef<TextInput>(null);
    const [disabled, setDisabled] = useState(false);


    useEffect(()=>{
        firstNameRef.current?.focus();
    },[])

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.nameBigContainer}>
                <View style={styles.nameIcon}>
                    <MaterialCommunityIcons name="newspaper-variant-outline" size={25} color="#00000" />
                </View>
                <Text style={styles.largeText}>What's your name?</Text>
                <View style={styles.nameContainer}>
                    <TextInput
                        ref={firstNameRef}
                        placeholder="First name"
                        style={styles.nameInput}
                        placeholderTextColor='#DAE0E2'
                    />
                    <TextInput
                        placeholder="Last name"
                        style={styles.nameInput}
                        placeholderTextColor='#DAE0E2'
                    />
                    <Text style={styles.smallText}>Last name is optional, and only shared with {"\n"}matches.</Text>
                </View>
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('EmailScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default NameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    nameIcon:{
        height:40,
        width:40,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        borderWidth:2,
        borderColor:'#000000',
        marginBottom:20
    },
    largeText:{
        fontSize:33,
        fontFamily: 'TiemposHeadline-Semibold',
        lineHeight:43
    },
    nameBigContainer:{
        marginTop:87
    },
    nameInput:{
        borderBottomWidth:1,
        marginTop:20,
        fontSize:28,
        fontFamily: 'ModernEra-Bold',
        fontWeight:'light',
        color:'#000000',
    },
    nextIcon:{
        height:55,
        width:55,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:100,
        position:'absolute',
        right:10,
        bottom:10,
    },
    nameContainer:{
        marginTop:38
    },
    smallText:{
        fontSize:13,
        marginTop:15,
        fontFamily: 'ModernEra-Medium',
        color:'#99AAAB',
    }
})