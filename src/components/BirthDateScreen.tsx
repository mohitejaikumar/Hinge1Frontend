import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo'

type BirthDateScreenProps = NativeStackScreenProps<AuthStackParamList, 'BirthDateScreen'>;


const BirthDateScreen = ({navigation}:BirthDateScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const dayRef = useRef<TextInput>(null);
    const monthRef = useRef<TextInput>(null);
    const yearRef = useRef<TextInput>(null);

    const handleDayChange = (text:string) => {
        setDay(text);
        if (text.length == 2) {
            monthRef.current?.focus();
        }
    };

    const handleMonthChange = (text:string) => {
        setMonth(text);
        if (text.length == 2) {
        yearRef.current?.focus();
        }
    };

    const handleYearChange = (text:string) => {
        setYear(text);
    };

    useEffect(()=>{
        dayRef.current?.focus();
    },[])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dateContainer}>
                <View style={styles.cakeIcon}>
                    <Entypo name="cake" size={20} color="#000000" />
                </View>
                <Text style={styles.largeText}>What's your date of {"\n"}birth?</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 20,
                    }}>
                <TextInput
                    autoFocus={true}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: 'black',
                        paddingBottom: 10,
                        width: 60,
                        fontSize: 30,
                        fontFamily: 'TiemposHeadline-Semibold',
                        color: '#000000',
                    }}
                    placeholder="DD"
                    placeholderTextColor={'#99AAAB'}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={handleDayChange}
                    value={day}
                />

                {/* Month Input Field */}
                <TextInput
                    ref={monthRef}
                    style={{
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    paddingBottom: 10,
                    width: 68,
                    fontSize: 30,
                    fontFamily: 'TiemposHeadline-Semibold',
                    }}
                    placeholder="MM"
                    placeholderTextColor={'#99AAAB'}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={handleMonthChange}
                    value={month}
                />
                <TextInput
                    ref={yearRef}
                    style={{
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    paddingBottom: 10,
                    width: 90,
                    fontSize: 30,
                    fontFamily: 'TiemposHeadline-Semibold',
                    }}
                    placeholder="YYYY"
                    placeholderTextColor={'#99AAAB'}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={handleYearChange}
                    value={year}
                />
                </View>
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('NameScreen')
                }}
            />
        </SafeAreaView>
    )
}

export default BirthDateScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    cakeIcon:{
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
    dateContainer:{
        marginTop:87
    },
    
})