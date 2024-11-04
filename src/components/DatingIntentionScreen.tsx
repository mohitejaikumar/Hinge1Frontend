import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

type DatingIntentionScreenProps = NativeStackScreenProps<AuthStackParamList, 'DatingIntentionScreen'>;

const DatingIntentionScreen = ({navigation}:DatingIntentionScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const [selectedIntention, setSelectedIntention] = useState('');
    
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.intentionContainer}>
                <View style={styles.intentionIcon}>
                    <Feather name="search" size={25} color="#000000" />
                </View>
                <Text style={styles.largeText}>What's your dating {"\n"}intention?</Text>
            </View>
            <View>
                <View style={[styles.intentionViewContainer,{marginTop:40}]}>
                    <Text style={styles.intentionName}>Life partner</Text>
                    <Pressable onPress={()=>setSelectedIntention('Life partner')}>
                        <FontAwesome 
                        name={selectedIntention === 'Life partner'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedIntention === 'Life partner'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Long-term relationship</Text>
                    <Pressable onPress={()=>setSelectedIntention('Long-term relationship')}>
                        <FontAwesome 
                        name={selectedIntention === 'Long-term relationship'? 'dot-circle-o' : 'circle-o'} 
                        size={28}  
                        color={selectedIntention === 'Long-term relationship'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Long-term relationship, open to short</Text>
                    <Pressable onPress={()=>setSelectedIntention('Long-term relationship, open to short')}>
                        <FontAwesome 
                        name={selectedIntention === 'Long-term relationship, open to short'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedIntention === 'Long-term relationship, open to short'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Short-term relationship, open to long</Text>
                    <Pressable onPress={()=>setSelectedIntention('Short-term relationship, open to long')}>
                        <FontAwesome 
                        name={selectedIntention === 'Short-term relationship, open to long'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedIntention === 'Short-term relationship, open to long'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Short-term relationship</Text>
                    <Pressable onPress={()=>setSelectedIntention('Short-term relationship')}>
                        <FontAwesome 
                        name={selectedIntention === 'Short-term relationship'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedIntention === 'Short-term relationship'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Figuring out my dating goals</Text>
                    <Pressable onPress={()=>setSelectedIntention('Figuring out my dating goals')}>
                        <FontAwesome 
                        name={selectedIntention === 'Figuring out my dating goals'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedIntention === 'Figuring out my dating goals'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                <View style={styles.intentionViewContainer}>
                    <Text style={styles.intentionName}>Prefer not to say</Text>
                    <Pressable onPress={()=>setSelectedIntention('Prefer not to say')}>
                        <FontAwesome 
                        name={selectedIntention === 'Prefer not to say'? 'dot-circle-o' : 'circle-o'} 
                        size={28} 
                        color={selectedIntention === 'Prefer not to say'? '#66295B' : '#DAE0E2'}  
                        />
                    </Pressable>
                </View>
                
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('HomeTown')
                }}
            />
        </SafeAreaView>
    )
}

export default DatingIntentionScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    intentionIcon:{
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
    intentionContainer:{
        marginTop:87
    },
    intentionViewContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:30,
        borderBottomWidth:1,
        paddingBottom:10,
        borderBottomColor:'#DAE0E2'
        
    },
    intentionName:{
        fontSize:15,
        fontFamily: 'ModernEra-Bold',
    }, 
})