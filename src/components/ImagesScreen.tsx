import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from './NextButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Octicons from 'react-native-vector-icons/Octicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo'

type ImagesScreenProps = NativeStackScreenProps<AuthStackParamList, 'ImagesScreen'>;

const ImagesScreen = ({navigation}:ImagesScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const [images , setImages] = useState(["","","","","",""]);
    
    const onImageGalleryClick = useCallback((index:number) => {
        ImagePicker.launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true
        }, res => {
            if(res.didCancel) {
                console.log('User cancelled')
            } else if(res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {
                console.log(res);
                console.log(res.assets![0].base64, res.assets![0].type);
                setImages(prev=>{
                    const newImages = [...prev];
                    //@ts-ignore
                    newImages[index] = res.assets![0].base64;
                    return newImages;
                })
            }
        });
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.imageIcon}>
                    <Octicons name="image" size={22} color="#000000" />
                </View>
                <Text style={styles.largeText}>Pick your photos</Text>
            </View>
            <View style={styles.imagesContainer}>
            { images.map((image,index)=>{
                    return (
                        <Pressable key={index} style={styles.individualImage} onPress={()=>onImageGalleryClick(index)}>
                            { image === ''
                                ?
                                <View style={styles.emptyImageContainer}>
                                    <View>
                                        <EvilIcons name="image" size={50} color="#A4B0BD" />
                                        <AntDesign 
                                            name="pluscircle" 
                                            size={20} 
                                            color="#66295B" 
                                            style={styles.plus} 
                                        />
                                    </View>
                                    
                                </View>
                                :
                                <View style={{width:'100%',height:'100%',position:'relative'}}>
                                    <Image
                                        source={{
                                            uri:`data:image/*;base64,${image}`
                                        }}
                                        style={{
                                            width:'100%',
                                            height:'100%',
                                            resizeMode:'cover',
                                            borderRadius:10,
                                        }}
                                    />
                                    <Entypo 
                                        name="circle-with-cross" 
                                        size={20} 
                                        color="#66295B"
                                        
                                        style={styles.cross} 
                                    />
                                </View>
                                
                            }
                        </Pressable>
                    )
                })
            }
            </View>
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('PromptScreen',{prompts:["","",""]})
                }}
            />
        </SafeAreaView>
    )
}

export default ImagesScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    imageIcon:{
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
    imageContainer:{
        marginTop:87
    },
    individualImage:{
        width:110,
        height:110,
        justifyContent:'center',
        alignItems:'center',
        
    },
    imagesContainer:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row',
        gap:15,
        marginTop:100,
        
        // backgroundColor:'red',
    },
    plus:{
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:'white',
        transform: [{ translateX: "10%" },{translateY: "20%"}]
    },
    cross:{
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:'white',
        borderRadius:100,
        transform: [{ translateX: "20%" },{translateY: "-30%"}]
    },
    emptyImageContainer:{
        position:'relative',
        borderStyle:'dashed',
        width:'100%',
        height:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#A4B0BD',
    }
})