import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LikedComponent = ({
    item,
    backgroundColor,
    parentBackgroundColor,
    textColor,

}:{
    item:string,
    backgroundColor:string,
    parentBackgroundColor:string,
    textColor:string
}) => {
    return (
        <Pressable style={{backgroundColor:parentBackgroundColor ,width: `${item === 'answer' ? '45%' : '40%'}` , marginLeft:10 , marginTop:10 , display:'flex', alignContent:'center' , justifyContent:'center' , borderRadius:10 , position:'relative'}}>
            <View style={{paddingHorizontal:'5%' , paddingVertical:8 , borderRadius:10,borderBottomLeftRadius:0,backgroundColor:backgroundColor}}>
                <Text style={{fontStyle:'italic' , color:textColor , fontFamily:'ModernEra-Medium'}}>Liked your {item}</Text>
            </View>
            <View style={{height:20,width:'100%',borderTopLeftRadius:15, backgroundColor:parentBackgroundColor , zIndex:2000}}>
            </View>
            <View style={{position:'absolute' , bottom:0, right:0 , left:0, height:20, backgroundColor:backgroundColor}}>
            </View>
        </Pressable>
    )
}

export default LikedComponent
