/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../ScreenWrapper';
import {Dimensions} from 'react-native';
//import {FontFamily, Border, FontSize, Color} from '../GlobalStyles';

const HowToPlayScreen = () => {
  const navigation = useNavigation();

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
              <Text style={[styles.ProgressionText]}>HOW TO PLAY</Text>
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
            <Image
            style={styles.howtoplay}
            source={require('../assets/Connect_Four.gif')}
            />

            <View style={styles.selfcentered}>
              <Text style={[styles.instructionsContainer]}>
                <View >
                <Text style={styles.instructionsHeader}>{'INSTRUCTIONS'}</Text>
                </View>
                  <Text style={styles.instructions}>
                    {`1.The game is played in turns between you and your opponent

2.The objective is to connect four pieces either horizontally, vertically or diagonallly

3.The first player to connect all four pieces is regarded as a winner

4.The score will be recorded every time you play
`}
                  </Text>
                </Text>
            </View>
            <Image
              style={[styles.frameIcon1, styles.frameIconPosition]}
              resizeMode="contain"
              source={require('../assets/frame1.png')}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    top: '8%',
    height: '10%',
    alignSelf: 'center',
  },
  howtoplay:{
    marginTop:'10%',
    width:'90%',
    alignSelf:'center',
  },
  instructionsContainer:{
    width:'90%',
    marginTop:'3%',
    alignSelf:'center',
  },
  instructionsHeader:{
    textAlign:'center',
    color: '#FFD700',
    textDecorationLine: 'underline',
    width:'100%',
    fontSize: 0.081 * Dimensions.get('window').width,
  },
  instructions:{
    width:'100%',
    marginTop: '25%',
    fontSize:0.039 * Dimensions.get('window').width,
    color:'#fff',
    textAlign:'center',
  },
  ProgressionText: {
    marginLeft: '3%',
    top: 5,
    position: 'absolute',
    alignSelf: 'flex-start',
    fontSize: 0.089 * Dimensions.get('window').width,
    fontWeight: '800',
    textAlign: 'center',
    color:'gold',
  },
  ggcloseIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -2,
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
    maxHeight:'95%',
    height: 0.844 * Dimensions.get('window').height, // Adjusted for responsiveness
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
    height: '95%',
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
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfcentered: {
    alignSelf: 'center',
    width:'90%',
  },
});

export default HowToPlayScreen;
