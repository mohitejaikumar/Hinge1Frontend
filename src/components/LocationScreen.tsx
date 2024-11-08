import { View, Text, StyleSheet, SafeAreaView, Platform, PermissionsAndroid, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NextButton from './NextButton'
import { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtil';
import Config from 'react-native-config';

type LocationScreenProps = NativeStackScreenProps<AuthStackParamList, 'LocationScreen'>;

const LocationScreen = ({navigation}:LocationScreenProps) => {
    const [disabled, setDisabled] = useState(true);
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState({latitude:0, longitude:0});
    // console.log('location', location);
    const [region, setRegion] = useState("");
    
    const getLocation = async()=>{
        const location = await getRegistrationProgress('Location');
        if(location !== null){
            setLocation(JSON.parse(location));
            setDisabled(false);
        }
    }
    useEffect(()=>{
        requestLocationPermission();
        getLocation();
    },[])

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('Location permission granted');
                goToMyLocation();
            } else {
                // console.log('Location permission denied');
            }
        }
    };
    const goToMyLocation = () => {
        Geolocation.getCurrentPosition(
        async(position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            
            // console.log(position);
            // Animate map to user location
            mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01, // Zoom level
            longitudeDelta: 0.01,
            }, 1000); // Duration in milliseconds
            
            try{
                const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`,
                )
                const data = await response.json();
                // console.log('date', data);
                if (data.results.length > 0) {
                
                    // console.log(data.results[0].formatted_address);
                    setRegion(data.results[0].formatted_address);
                    // save to async storage 
                    await saveRegistrationProgress('Region', JSON.stringify(data.results[0].formatted_address));
                    await saveRegistrationProgress('Location', JSON.stringify({latitude:latitude, longitude:longitude}));
                    setDisabled(false);
                }
            }
            catch(error){
                console.error('Error fetching location:', error)
            }
        },
        (error) => {
            // console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handleMarkerDragEnd = async(coordinate:LatLng) => {
    // Use reverse geocoding to get the location name from latitude and longitude
        setLocation(coordinate);
        
        fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyAWpV8r8H3ro1n3dD9LcuSSaaCeguDBFOs`,
        )
        .then(response => response.json())
        .then(async data => {
            // console.log('New location:', data);
            if (data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            let formattedAddress = '';
            for (let component of addressComponents) {
                if (component.types.includes('route')) {
                formattedAddress += component.long_name + ', ';
                }
                if (component.types.includes('sublocality_level_1')) {
                formattedAddress += component.long_name + ', ';
                }
                if (component.types.includes('locality')) {
                formattedAddress += component.long_name + ', ';
                }
            }
            // Remove the trailing comma and space
            formattedAddress = formattedAddress.trim().slice(0, -1);
            setRegion(formattedAddress);
            // save to async storage 
            await saveRegistrationProgress('Region', JSON.stringify(formattedAddress));
            await saveRegistrationProgress('Location', JSON.stringify(coordinate));
            }
        })
        .catch(error => console.error('Error fetching location:', error));
        
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
                    zoomEnabled={true}
                >
                <Marker
                    draggable
                    coordinate={location}
                    style={{
                        width:'100%'
                    }}
                    onDragEnd={e => handleMarkerDragEnd(e.nativeEvent.coordinate)}
                >   
                </Marker>
                </MapView>
                <Pressable  
                    onPress={goToMyLocation}
                    style={styles.locationButton}
                >
                    <Text style={{fontFamily:'ModernEra-Bold'}}>Go to my location</Text>
                </Pressable>
            </View>
            <View style={{marginTop:20}}>
                <Text style={{fontFamily:'ModernEra-Medium' , color:'#7f8c8d'}}>Long Press and Drag the marker to your location</Text>
            </View>
            <View style={{marginTop:20}}>
                <Text style={{fontFamily:'ModernEra-Medium' , color:'#2c3e50'}}>{region}</Text>
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