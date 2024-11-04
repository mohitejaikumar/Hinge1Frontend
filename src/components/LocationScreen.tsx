import { View, Text, StyleSheet, SafeAreaView, Platform, PermissionsAndroid, Button, Pressable } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NextButton from './NextButton'
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

type LocationScreenProps = NativeStackScreenProps<AuthStackParamList, 'LocationScreen'>;

const LocationScreen = ({navigation}:LocationScreenProps) => {
    const [disabled, setDisabled] = useState(false);
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState({latitude:0, longitude:0});
    console.log('location', location);
    const [region, setRegion] = useState("");
    

    useLayoutEffect(()=>{
        requestLocationPermission();
    },[])

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                goToMyLocation();
            } else {
                console.log('Location permission denied');
            }
        }
    };
    const goToMyLocation = () => {
        Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log(position);
            // Animate map to user location
            mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01, // Zoom level
            longitudeDelta: 0.01,
            }, 1000); // Duration in milliseconds

            fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyATUxdKZEwD_PcaAmQSwtz-wodXzHRE2wo`,
            )
            .then(response => response.json())
            .then(data => {
                console.log('date', data);
                if (data.results.length > 0) {
                    // setLocation(data.results[0].formatted_address);
                    console.log(data.results[0].formatted_address);
                    setRegion(data.results[0].formatted_address);
                }
            })
            .catch(error => console.error('Error fetching location:', error));
        },
        (error) => {
            console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.locationContainer}>
                <View style={styles.locationIcon}>
                    <Ionicons name="location-outline" size={30} color="#000000" />
                </View>
                <Text style={styles.largeText}>Where do you live?</Text>
            </View>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={mapRef}
                    style={styles.mapContainer}
                    showsUserLocation={true}
                    zoomEnabled={true}
                >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    style={{width:500 , backgroundColor:'red'}}
                >   
                    <View style={{width:500 , backgroundColor:'red'}}> 
                        <Text style={{fontFamily:'ModernEra-Bold'}}>{region}</Text>
                    </View>
                </Marker>
                </MapView>
                <Pressable  
                onPress={goToMyLocation}
                style={styles.locationButton}
                >
                    <Text style={{fontFamily:'ModernEra-Bold'}}>Go to my location</Text>
                </Pressable>
            </View>
            
            <NextButton
                disabled={disabled}
                onPress={()=>{
                    if(disabled)return;
                    navigation.replace('GenderScreen')
                }}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        backgroundColor:'#fff',
        position:'relative',
    },
    locationIcon:{
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
    locationContainer:{
        marginTop:87
    },
    locationButton:{
        width:200,
        height:50,
        position:'absolute',
        bottom:10,
        left:'50%',
        transform:[{translateX:'-50%'}],
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color:'#000000',
        backgroundColor:'#fff',
        borderRadius:100,
    },
    mapContainer:{
        height:500,
        width:'100%',
        marginTop:30,
        position:'relative',
        alignContent:'center',
        borderRadius:5,
    }
    
})
export default LocationScreen