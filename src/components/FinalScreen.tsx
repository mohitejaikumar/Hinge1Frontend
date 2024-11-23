import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getRegistrationProgress } from '../../registrationUtil';
import { useRegistration } from '../hooks/useRegistration';
import ConfettiCannon from 'react-native-confetti-cannon';
import axios from 'axios';
import { useToken } from '../hooks/useToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

interface RegistrationDetails{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    gender:string,
    phoneNumber:string,
    date_of_birth:string,
    homeTown:string,
    religion:string,
    preferredGender:string,
    occupation:string,
    region:string,
    latitude:number,
    longitude:number
    behaviours:{
        question:string,
        answer:string
    }[],
    images?:string[]
}

const FinalScreen = () => {

    const [isLoading , setisLoading] = useState(true);
    const {behaviours , storageImages} = useRegistration();
    const cofiRef = useRef<ConfettiCannon>(null);
    const [error, setError] = useState(false);
    const {setToken} = useToken();

    const getRegistrationDetails = async()=>{
        setisLoading(true);
        const firstName = await getRegistrationProgress('FirstName');
        const lastName = await getRegistrationProgress('LastName');
        const email = await getRegistrationProgress('Email');
        const password = await getRegistrationProgress('Password');
        const gender = await getRegistrationProgress('Gender');
        const phoneNumber = await getRegistrationProgress('PhoneNumber');
        const dateOfBirth = await getRegistrationProgress('DateOfBirth');
        const homeTown = await getRegistrationProgress('HomeTown');
        const religion = await getRegistrationProgress('Religion');
        const preferredGender = await getRegistrationProgress('PreferredGender');
        const occupation = await getRegistrationProgress('Occupation');
        const region = await getRegistrationProgress('Region');
        const location = await getRegistrationProgress('Location');
        const datingType = await getRegistrationProgress('DatingType')
        
        const userData = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            gender:gender,
            phoneNumber:phoneNumber,
            date_of_birth:dateOfBirth,
            home_town:homeTown,
            religion:religion,
            preferredGender:preferredGender,
            occupation:occupation,
            region:region,
            latitude:String(JSON.parse(location).latitude),
            longitude:String(JSON.parse(location).longitude),
            behaviours:behaviours,
            dating_type:datingType,
        }

        try{
            const formData = new FormData();
            storageImages.forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    name: `image_${index}.jpg`,
                    type: `image/png`,
                });
            });
            formData.append('userData',JSON.stringify(userData));
            const response = await axios.post(`${Config.BACKEND_URL}/users/register`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setisLoading(false)
            setError(false);
            cofiRef.current?.start();
            await new Promise((resolve)=> setTimeout(resolve, 3000));
            setToken(response.data.token);
            await AsyncStorage.setItem('token',response.data.token);
            console.log(Config.BACKEND_URL);
            // success
        }
        catch(err){
            //@ts-ignore
            console.log(JSON.stringify(err.message))
            setError(true);
            setisLoading(false);
        }
    }

    useEffect(()=>{
        getRegistrationDetails();
    },[])

    return (
        <View style={styles.container}>
            <ConfettiCannon
                count={200}
                origin={{x: -10, y: 0}}
                autoStart={false}
                ref={cofiRef}
            />
            {isLoading && 
                    <ActivityIndicator
                        size="large"
                        color="#66295B"
                    />
            }
            {!isLoading && !error && 
                    <View style={styles.successContainer}>
                        <Text style={styles.successText}>Success!</Text>
                    </View>
            }
            { error && !isLoading &&
                    <View style={styles.successContainer}>
                        <Text style={styles.errorText}>Error</Text>
                    </View>
            }
            {/* <Pressable onPress={getRegistrationDetails}>
                <Text>Press to get registration details</Text>

            </Pressable> */}
            
        </View>
    )
}

export default FinalScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        
    },
    successContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        fontSize: 50,
        color: '#2E7D32', // Success green color
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 50,
        color: 'red', // Success green color
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

