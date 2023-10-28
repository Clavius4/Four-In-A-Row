/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LogoScreen from './src/screens/LogoScreen';
import ProgressionScreen from './src/screens/ProgressionScreen';
import SettingScreen from './src/screens/SettingScreen';
import CustomizationScreen from './src/screens/CustomizationScreen';
import HowToPlayScreen from './src/screens/HowToPlayScreen';
import SinglePlayer from './src/screens/SinglePlayer';
import MultiPlayer from './src/screens/MultiPlayer';
import LevelSelection from './src/screens/LevelSelection';
import DatabaseService from './src/components/DatabaseService';
import { SoundProvider } from './src/components/SoundContext';
import Purchases from 'react-native-purchases';
import { Settings } from 'react-native-fbsdk-next';
import { SubscriptionProvider } from './src/components/SubscriptionContext';
//import { LOG_LEVEL } from 'react-native-purchases';

type RootStackParamList = {
  Home: undefined;
  Logo: undefined;
  Progression:undefined;
  Settings:undefined;
  Customize:undefined;
  Howtoplay:undefined;
  Singleplayer:undefined;
  Multiplayer:undefined;
  Levelselection:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  Settings.initializeSDK();
  DatabaseService();
  useEffect(() => {
    // Configure RevenueCat
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: '' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'goog_BbRpAJLJOUQGXbBLuLYhwXozqcK',appUserID: null, observerMode: false, useAmazon: false});
    }
  }, []);
  return (
    <SoundProvider>
     <NavigationContainer>
      <SubscriptionProvider>
      <Stack.Navigator initialRouteName="Logo">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Progression" component={ProgressionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Customize" component={CustomizationScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Howtoplay" component={HowToPlayScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Singleplayer" component={SinglePlayer} options={{headerShown:false}} />
        <Stack.Screen name="Multiplayer" component={MultiPlayer} options={{headerShown:false}} />
        <Stack.Screen name="Levelselection" component={LevelSelection} options={{headerShown:false}}/>
      </Stack.Navigator>
      </SubscriptionProvider>
     </NavigationContainer>
    </SoundProvider>
  );
};
export default App;
