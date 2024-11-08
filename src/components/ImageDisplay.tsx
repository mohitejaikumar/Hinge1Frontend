import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const ImageDisplay = ({url}:{url:string}) => {
    const [loading , setLoading] = useState(false);
    return (
        <>
        {
            loading && 
            <View style={styles.loadingContaniner}>
                <ActivityIndicator size="large" color="#66295B" />
            </View>
            
        }
        <Image
            source={{
                uri:url
            }}
            style={styles.imageStyle}
            onLoadStart={()=>{
                setLoading(true);
            }}
            onLoadEnd={()=>{
                setLoading(false);
            }}
        />
        </>
    )
}

export default ImageDisplay

const styles = StyleSheet.create({
    imageStyle:{
        width:'100%',
        height:400,
        marginTop:20,
        marginBottom:10,
        borderRadius:10,
        resizeMode:'cover',
    },
    loadingContaniner:{
        width:'100%',
        height:400,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    }
})