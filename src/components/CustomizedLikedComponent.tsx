import { Image, StyleSheet, Text, View } from "react-native"


export const ImageLiked = ({url}:{url:string})=>{
    return (
        <View>
            <Image
                source={{
                    uri:url
                }}
                style={styles.imageStyle}
            />
        </View>
    )
}

export const AnswerLiked = ({question,answer}:{question:string,answer:string})=>{
    return (
        <View style={styles.promptContainer}>
            <Text style={styles.promptQuestion}>{question}</Text>
            <Text style={styles.promptAnswer}>{answer}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    imageStyle:{
        width:'100%',
        height:150,
        marginTop:20,
        marginBottom:10,
        borderRadius:10,
        resizeMode:'cover',
    },
})