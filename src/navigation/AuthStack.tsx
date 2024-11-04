import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/LandingScreen';
import PhoneNumber from '../components/PhoneNumber';
import LandingScreen from '../components/LandingScreen';
import NameScreen from '../components/NameScreen';
import EmailScreen from '../components/EmailScreen';
import BirthDateScreen from '../components/BirthDateScreen';
import LocationScreen from '../components/LocationScreen';
import GenderScreen from '../components/GenderScreen';
import PreferredGenderScreen from '../components/PreferredGenderScreen';
import DatingIntentionScreen from '../components/DatingIntentionScreen';
import HomeTown from '../components/HomeTown';
import ReligionScreen from '../components/ReligionScreen';
import ImagesScreen from '../components/ImagesScreen';
import PromptScreen from '../components/PromptScreen';
import SelectPrompt from '../components/SelectPrompt';
import WriteAnswerScreen from '../components/WriteAnswerScreen';
import FinalScreen from '../components/FinalScreen';
import WorkScreen from '../components/WorkScreen';
import PasswordScreen from '../components/PasswordScreen';

type Prompt = string |{
    question:string,
    answer:string
}

export type AuthStackParamList = {
    LandingScreen: undefined;
    PhoneNumber: undefined;
    NameScreen: undefined;
    EmailScreen: undefined;
    BirthDateScreen: undefined;
    LocationScreen: undefined;
    GenderScreen:undefined;
    PreferredGenderScreen:undefined;
    DatingIntentionScreen:undefined;
    HomeTown:undefined;
    ReligionScreen:undefined;
    ImagesScreen:undefined;
    PromptScreen:{
        prompts?:Prompt[]
    };
    Prompts:{
        prompts:Prompt[],
        index:number
    }
    "Write Answer":{
        question:string,
        prompts:Prompt[],
        index:number
    },
    WorkScreen:undefined,
    PasswordScreen:undefined,
    FinalScreen:undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="LandingScreen" 
            component={LandingScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="PhoneNumber"
            component={PhoneNumber}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="NameScreen"
            component={NameScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EmailScreen"
            component={EmailScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="BirthDateScreen"
            component={BirthDateScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="LocationScreen"
            component={LocationScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="GenderScreen"
            component={GenderScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="PreferredGenderScreen"
            component={PreferredGenderScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="DatingIntentionScreen"
            component={DatingIntentionScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="HomeTown"
            component={HomeTown}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="ReligionScreen"
            component={ReligionScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="ImagesScreen"
            component={ImagesScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="PromptScreen"
            component={PromptScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="Prompts"
            component={SelectPrompt}
            options={{headerTitleStyle:{
                fontFamily:'ModernEra-Bold',
            }}}            
            />
            <Stack.Screen
            name="Write Answer"
            component={WriteAnswerScreen}
            options={{headerTitleStyle:{
                fontFamily:'ModernEra-Bold',
            }}}           
            />
            <Stack.Screen
            name="WorkScreen"
            component={WorkScreen}
            options={{headerTitleStyle:{
                fontFamily:'ModernEra-Bold',
            }}}           
            />
            <Stack.Screen
            name="FinalScreen"
            component={FinalScreen}
            options={{headerShown:false}}            
            />
            <Stack.Screen
            name="PasswordScreen"
            component={PasswordScreen}
            options={{headerShown:false}}            
            />
        </Stack.Navigator>
    );
};

export default AuthStack;

