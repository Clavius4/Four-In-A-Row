/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import ScreenWrapper from '../ScreenWrapper';
import Slider from '@react-native-community/slider';
import { useSoundContext } from '../components/SoundContext';
const SettingScreen = ({navigation}) => {
  const { soundvolume, musicvolume, updateSoundVolume, updateMusicVolume } = useSoundContext();

  const handleSoundChange = value => {
    // console.log('value ' + value);
    if (value > 0.75){
      updateSoundVolume(1);
    }
    else if (value > 0.6){
      updateSoundVolume(0.8);
    }
    else if (value > 0.4){
      updateSoundVolume(0.5);
    }
    else if (value > 0.1){
      updateSoundVolume(0.3);
    }
    else {
      updateSoundVolume(0);
    }
    // Update the volume of your music or sound using the value (e.g., with a player library)
  };
  const handleMusicChange = value => {
    // console.log('value ' + value);
    if (value > 0.75){
      updateMusicVolume(1);
    }
    else if (value > 0.6){
      updateMusicVolume(0.8);
    }
    else if (value > 0.4){
      updateMusicVolume(0.5);
    }
    else if (value > 0.1){
      updateMusicVolume(0.3);
    }
    else {
      updateMusicVolume(0);
    }
    // Update the volume of your music or sound using the value (e.g., with a player library)
  };
  return (
    <ScreenWrapper>
      <View style={[styles.settings, styles.centered]}>
        <View style={[styles.row50, styles.centered]}>
          <View style={[styles.groupParent, styles.frameIconPosition]}>
            {/* white display on top of margin */}
            <Image
              style={styles.topAllign}
              resizeMode="cover"
              source={require('../assets/rectangle-9214.png')}
            />
            {/* header containing settings and its icon */}
            <View style={styles.headerRectangle}>
              <Image
                style={styles.header}
                resizeMode="cover"
                source={require('../assets/rectangle-9123.png')}
              />
              <Text style={[styles.settingsText]}>SETTINGS</Text>
              <Image
                style={styles.circle1}
                resizeMode="cover"
                source={require('../assets/ellipse-38.png')}
              />
              <Image
                style={[styles.circle2]}
                resizeMode="cover"
                source={require('../assets/ellipse-28.png')}
              />
              <Pressable
                style={[styles.ggcloseIcon]}
                onPress={() => navigation.navigate('Home')}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/ggcloser.png')}
                />
              </Pressable>
            </View>
            {/* end of header */}
            <Image
              style={styles.pentagon}
              resizeMode="cover"
              source={require('../assets/rectangle-9220.png')}
            />
            <View style={styles.selfcentered}>
              <View style={styles.soundMusic}>
                <Image
                  style={[styles.music]}
                  resizeMode="contain"
                  source={require('../assets/music.png')}
                />
                <Slider
                  style={[styles.slider]}
                  minimumValue={0}
                  maximumValue={1}
                  step={0.01}
                  value={musicvolume}
                  onValueChange={handleMusicChange}
                  minimumTrackTintColor="#000" // Change this color
                  maximumTrackTintColor="#fff" // Change this color
                />
              </View>
              <View style={styles.soundMusic} >
                <Image
                  style={[styles.sound]}
                  resizeMode="contain"
                  source={require('../assets/sound.png')}
                />
                <Slider
                  style={[styles.slider]}
                  minimumValue={0}
                  maximumValue={1}
                  step={0.01}
                  value={soundvolume}
                  onValueChange={handleSoundChange}
                  minimumTrackTintColor="#000" // Change this color
                  maximumTrackTintColor="#fff" // Change this color
                />
              </View>
            </View>
            <Image
              style={[styles.frameIcon1, styles.frameIconPosition]}
              resizeMode="contain"
              source={require('../assets/frame1.png')}
            />
          </View>
        </View>
        <View style={[styles.row25]}>
          <Pressable onPress={() => navigation.navigate('Howtoplay')}>
            <Image
              // style={styles.customize}
              resizeMode="contain"
              source={require('../assets/howtoplay.png')}
            />
          </Pressable>
          <View style={styles.spacer} />
          <Pressable onPress={() => navigation.navigate('Customize')}>
            <Image
            //  style={styles.customize}
              resizeMode="contain"
              source={require('../assets/customize.png')}
            />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  customize:{
    width:'75%',
    height:'75%',
  },
  topAllign: {
    top: 0,
    width: '100%',
  },
  header: {
    position: 'absolute',
    width: '100%',
    top: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerRectangle: {
    width: '98%',
    alignSelf: 'center',
  },
  pentagon: {
    width: '98%',
    top: '13%',
    height: '24%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  music: {
    marginTop: '5%',
    width:'15%',
  },
  sound: {
    marginTop: '5%',
    width:'15%',
  },
  settingsText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 0.11 * Dimensions.get('window').width,
    fontWeight: '800',
    top: 0,
    textAlign: 'center',
    color: 'gold',
  },
  ggcloseIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    //top: -2,
  },
  circle1: {
    position: 'absolute',
    top: 0,
    width: '100%',
    opacity: 0.5,
    height: '50%',
    alignSelf: 'center',
  },
  circle2: {
    position: 'absolute',
    opacity: 1,
    height: '50%',
    alignSelf: 'center',
  },
  settings: {
    alignSelf: 'center',
    flex: 1,
    width: '90%',
    height: '80%',
    //height: 0.744 * Dimensions.get('window').height, // Adjusted for responsiveness
    flexDirection: 'column',
  },
  frameIconPosition: {
    position: 'absolute',
    overflow: 'hidden',
  },
  frameIcon1: {
    width: '100%',
    aspectRatio: 9,
    bottom: 0,
  },
  groupParent: {
    borderRadius: 24,
    height: '90%',
    width: '88%',
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: {
      width: 0,
      height: 0.1 * Dimensions.get('window').height,
    },
    shadowRadius: 0.2 * Dimensions.get('window').height,
    elevation: 0.052 * Dimensions.get('window').height,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderColor: '#b6439c',
    borderWidth: 0.0056 * Dimensions.get('window').width,
  },
  row50: {
    flex: 0.7,
    maxHeight:'60%',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row25: {
    marginTop: '25%',
    width: '100%',
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  spacer: {
    flex: 1, // Flex to push the second image to the end
  },
  selfcentered: {
    alignSelf: 'center',
    marginTop:'10%',
  },
  slider:{
  marginTop:'7%',
  width:'70%',
  height:'20%',
  },
  soundMusic:{
   // marginTop:'2%',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  },
});

export default SettingScreen;
