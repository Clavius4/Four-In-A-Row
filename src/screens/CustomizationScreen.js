/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import Property1Variant4Icon from '../components/Property1Variant4Icon';
import ScreenWrapper from '../ScreenWrapper';
// import SaveTheme from '../components/saveTheme';
import SQLite from 'react-native-sqlite-2';

const CustomizationScreen = ({navigation}) => {
  const [selectedIcon, setSelectedIcon] = useState(
    <Property1Variant4Icon
      imageDimensions={require('../assets/board1.png')}
      propTop={'0%'}
      propLeft={'8%'}
      propWidth={'80%'}
      propHeight={'80%'}
    />,
  );
  const [iconNo,setIconNo] = useState(1);

  const db = SQLite.openDatabase({
    name: 'progression.db',
  });

  function SaveTheme(icon) {
      // console.log(icon);
   if (icon === 1){
      db.transaction(tx => {
          tx.executeSql(
            'UPDATE BoardTheme SET Board = ?',
            ['boardone'],
            (_, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                navigation.navigate('Home');
                //setSelectedIcon
                // Additional logic or state updates after a successful update
              }
            }
          );
        });
   }
    else if (icon === 2){
      db.transaction(tx => {
          tx.executeSql(
            'UPDATE BoardTheme SET Board = ?',
            ['boardtwo'],
            (_, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                navigation.navigate('Home');
                // Additional logic or state updates after a successful update
              }
            }
          );
        });
    }
  else if (icon === 3){
      db.transaction(tx => {
          tx.executeSql(
            'UPDATE BoardTheme SET Board = ?',
            ['boardthree'],
            (_, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                navigation.navigate('Home');
                // Additional logic or state updates after a successful update
              }
            }
          );
        });
  }
  }
  return (
    <ScreenWrapper>
      <View style={styles.Customization}>
        <View style={[styles.preview, styles.firstSubRow]}>
          <View style={[styles.previewHeader]}>
            <Image
              style={[styles.bgBox]}
              resizeMode="cover"
              source={require('../assets/rectangle-91231.png')}
            />
            <Image
              style={[styles.circle1]}
              resizeMode="cover"
              source={require('../assets/ellipse-282.png')}
            />
            <Image
              style={styles.ellipseIcon}
              resizeMode="cover"
              source={require('../assets/ellipse-292.png')}
            />
            <Image
              style={styles.rectangleIcon}
              resizeMode="cover"
              source={require('../assets/rectangle-92141.png')}
            />
            <Text style={styles.previewText}>PREVIEW</Text>
          </View>
        </View>
        <View style={styles.secondSubRow}>{selectedIcon}</View>
        <View style={styles.thirdSubRow}>
          <View style={[styles.layouts]}>
            <Image
              style={[styles.bgBox]}
              resizeMode="cover"
              source={require('../assets/rectangle-91231.png')}
            />
            <Image
              style={[styles.circle1]}
              resizeMode="cover"
              source={require('../assets/ellipse-282.png')}
            />
            <Image
              style={styles.ellipseIcon}
              resizeMode="cover"
              source={require('../assets/ellipse-292.png')}
            />
            <Image
              style={styles.rectangleIcon}
              resizeMode="cover"
              source={require('../assets/rectangle-92141.png')}
            />
            <Text style={styles.piecesText}>PIECES & SCENE</Text>
          </View>
        </View>
        <View style={styles.fourthSubRow}>
          <View style={styles.innerrow}>
          <Pressable
            style={styles.pressable}
            onPress={() =>{
              setSelectedIcon(
                <Property1Variant4Icon
                  imageDimensions={require('../assets/board1.png')}
                  propTop={'0%'}
                  propLeft={'8%'}
                  propWidth={'80%'}
                  propHeight={'80%'}
                />,
              ); setIconNo(1);
            }
            }>
            <Property1Variant4Icon
              imageDimensions={require('../assets/board1.png')}
              propTop={'0%'}
              propLeft={'0%'}
              propWidth={'75%'}
              propHeight={'65%'}
            />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() =>{
              setSelectedIcon(
                <Property1Variant4Icon
                  imageDimensions={require('../assets/board6.png')}
                  propTop={'0%'}
                  propLeft={'8%'}
                  propWidth={'85%'}
                  propHeight={'85%'}
                />,
              ); setIconNo(3);
            }
            }>
            <Property1Variant4Icon
              imageDimensions={require('../assets/board6.png')}
              propTop={'0%'}
              propLeft={'0%'}
              propWidth={'80%'}
              propHeight={'80%'}
            />
          </Pressable>
          </View>
        </View>
        <View style={styles.fifthsubrow}>
          <Pressable
            style={styles.pressable}
            onPress={() =>{
              setSelectedIcon(
                <Property1Variant4Icon
                  imageDimensions={require('../assets/board3.png')}
                  propTop={'0%'}
                  propLeft={'8%'}
                  propWidth={'80%'}
                  propHeight={'80%'}
                />,
              ); setIconNo(2);
            }
            }>
            <Property1Variant4Icon
              imageDimensions={require('../assets/board3.png')}
              propTop={'0%'}
              propLeft={'0%'}
              propWidth={'75%'}
              propHeight={'65%'}
            />
          </Pressable>
        </View>
        <View style={[styles.buttonParent]}>
          <Pressable
            onPress={() => SaveTheme(iconNo)}>
            <Image source={require('../assets/save1.png')} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/cancel1.png')} />
          </Pressable>
        </View>
        <Image
          style={[styles.bottomRectangle]}
          resizeMode="cover"
          source={require('../assets/rectangle-9216.png')}
        />
      </View>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  Customization: {
    alignSelf: 'center',
    width: '90%',
    height: 0.944 * Dimensions.get('window').height,
    flex: 1,
    borderRadius: 20,
    shadowRadius: 47.61,
    elevation: 47.61,
    borderStyle: 'solid',
    borderColor: '#b6439c',
    borderTopWidth: 4.7,
    borderBottomWidth: 4.8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0.06671905517578,
    },
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    position: 'absolute',
    overflow: 'hidden',
  },
  buttonParent: {
    width: '80%',
    alignSelf: 'center',
    bottom: '2%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  firstSubRow: {
    flex: 0.1,
  },
  secondSubRow: {
    flex: 0.4,
  },
  thirdSubRow: {
    flex: 0.1,
  },
  fourthSubRow: {
    width:'90%',
    alignSelf:'center',
    flex: 0.2,
    flexDirection:'row',
  },
  fifthsubrow:{
    flex:0.2,
  },
  innerrow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Adjust as needed
    alignItems: 'center', // Align the row content vertically
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
  },
  layouts: {
    width: '95%',
    alignSelf: 'center',
    //:'-10%',
  },

  circle1: {
    top: 0,
    position: 'absolute',
    width: '70%',
    alignSelf: 'center',
  },
  ellipseIcon: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  rectangleIcon: {
    width: '100%',
    position: 'absolute',
  },
  bgBox: {
    top: 2,
    position: 'absolute',
    width: '95%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignSelf: 'center',
  },
  previewText: {
    alignSelf: 'center',
    position: 'absolute',
    textAlign: 'center',
    top: '2%',
    fontSize: 0.11 * Dimensions.get('window').width,
    fontWeight: '800',
    color: 'gold',
  },
  piecesText: {
    top: '10%',
    color: '#fff',
    fontSize: 0.08 * Dimensions.get('window').width,
    alignSelf: 'center',
  },
  previewHeader: {
    position: 'absolute',
    width: '100%',
  },
  pentagon: {
    alignSelf: 'center',
    width: '95%',
    top: '-25%',
    height: '8%',
    opacity: 0.5,
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
export default CustomizationScreen;
