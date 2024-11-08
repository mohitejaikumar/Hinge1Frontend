import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChatBubble = ({ message, isSender }:{
    message: string,
    isSender: boolean,
}) => {
    return (
        <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
            <View style={[styles.bubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
                <Text style={[styles.messageText, isSender? {color:'white'} : {color:'black'}]}>{message}</Text>
                {/* Arrow container */}
                <View style={[styles.arrowContainer, isSender ? styles.senderArrowContainer : styles.receiverArrowContainer]}>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Default to right align
    },
    senderContainer: {
        justifyContent: 'flex-end', // Align sender bubble to the right
    },
    receiverContainer: {
        justifyContent: 'flex-start', // Align receiver bubble to the left
    },
    bubble: {
        maxWidth: '75%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        position: 'relative',
    },
    senderBubble: {
        backgroundColor: '#66295B', // WhatsApp sender green bubble
        marginRight: 10,
    },
    receiverBubble: {
        backgroundColor: '#E5E5EA', // WhatsApp receiver grey bubble
        marginLeft: 10,
    },
    messageText: {
        fontSize: 16,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        width: 0,
        height: 0,
        overflow: 'hidden',
        borderWidth: 10,
        borderStyle: 'solid',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        
    },
    senderArrowContainer: {
        right: -8, // Position arrow to the right for sender
        borderTopColor: '#66295B',
    },
    receiverArrowContainer: {
        left: -8, // Position arrow to the left for receiver
        borderTopColor: '#E5E5EA',
    },
    
});