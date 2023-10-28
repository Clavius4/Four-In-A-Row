/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState,useRef} from 'react';
import {View, Text, StyleSheet,Dimensions,AppState} from 'react-native';
import ScreenWrapper from '../ScreenWrapper';
import Sound from 'react-native-sound';
import { useSoundContext } from '../components/SoundContext';

const LogoScreen = ({navigation}) => {

  Sound.setCategory('Ambient');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {musicvolume} = useSoundContext();
  const [backgroundSound, setBackgroundSound] = useState(null);
  //const [state,setState] = useState(null);


  useEffect(() => {
    const sound = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load background sound', error);
      } else {
        setBackgroundSound(sound);
        // Set initial volume and loop settings
        sound.setVolume(musicvolume);
        sound.setNumberOfLoops(-1);
        sound.play();
      }
    });

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        if (backgroundSound){
          backgroundSound.play();
        }
        sound.play();
      }
      // console.log(appStateVisible);
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
      if (appState.current === 'background')
      {
        if (backgroundSound){
          backgroundSound.stop();
        }
        sound.stop();
      }
    });

    return () => {
      if (backgroundSound) {
        backgroundSound.stop();
        backgroundSound.release();
      }
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (backgroundSound) {
      backgroundSound.setVolume(musicvolume);
    }
  }, [musicvolume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
      <ScreenWrapper>
        <View style={styles.container}>
        <Text style={styles.logoText}>RAVENS STUDIO</Text>
        </View>
      </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
  },
  logoText: {
    color: 'gold',
    fontWeight: '900',
    fontSize: 0.1 * Dimensions.get('window').width,
    fontFamily:'AnybodyFont',
  },
});

export default LogoScreen;
