import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

const NextButton = ({
    disabled,
    onPress,
}:{
    disabled:boolean,
    onPress:()=>void
}) => {
    return (
        <TouchableOpacity 
                style={[styles.nextIcon , {backgroundColor: disabled? '#DAE0E2' : '#66295B'}]}
                onPress={onPress}
            >
                <Entypo name="chevron-right" size={27} color={disabled? '#A4B0BD' : '#fff'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default NextButton