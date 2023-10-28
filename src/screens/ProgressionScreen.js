/* eslint-disable prettier/prettier */

import React,{useState,useEffect} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {Dimensions} from 'react-native';
import ScreenWrapper from '../ScreenWrapper';
import SQLite from 'react-native-sqlite-2';

const ProgressionScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const db = SQLite.openDatabase({
    name:'progression.db',
  });
 function winPercentage (played,won){
  if (played === 0){
    return (0 + '%');
  }
     return (Math.round((won / played) * 100) + '%');
 }
  useEffect(()=>{
  const retrieveData = (callback) => {
    db.transaction((tx) => {
      // Define your SELECT query here
      const query = 'SELECT * FROM playerData';
      tx.executeSql(query,[],(_, results) => {
          const rows = results.rows;
          //console.log(rows);
          const userdata = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            userdata.push({
              id: item.id,
              played: item.played,
              won: item.won,
              lost: item.lost,
              tie: item.tie,
              timePlayed:item.timePlayed,
              minTime: item.minTime,
            });
          }
          // Call the callback with the retrieved data as an object
          //console.log(userdata);
          callback(userdata);
        },
        (_, error) => {
          console.error('Error:', error);
          callback([]); // Return an empty array in case of an error
        }
      );
    });
  };
  // Usage: Call retrieveData to get the data as an object
  retrieveData((userdata) => {
    setUserData(userdata);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });}, []);

  function getTime(time){

    if (time > 86400){
      return (Math.round(time / 86400) + 'D');
    }
    else if (time >= 3600)
    {
      return (Math.round(time / 3600) + 'Hr');
    }
    else if (time >= 60)
    {
      return (Math.round(time / 60) + ' Min');
    }
    else if (time < 60){
      return (time + 's');
    }
  }
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
              <Text style={[styles.ProgressionText]}>PROGRESSION</Text>
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
            {userData.map((user)=>(
            <View style={styles.selfcentered} key={user.id}>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Games played</Text>
                <Text style={styles.cell}>{user.played}</Text>
              </View>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Games won</Text>
                <Text style={styles.cell}>{user.won}</Text>
              </View>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Games lost</Text>
                <Text style={styles.cell}>{user.lost}</Text>
              </View>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Games tied</Text>
                <Text style={styles.cell}>{user.tie}</Text>
              </View>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Win percentage</Text>
                <Text style={styles.cell}>{winPercentage(user.played,user.won)}</Text>
              </View>
              {/* <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Max. win in a row</Text>
                <Text style={styles.cell}>0</Text>
              </View> */}
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Min. Victory time</Text>
                <Text style={styles.cell}>{user.minTime === 86400 ? getTime(0) : getTime(user.minTime)}</Text>
              </View>
              <View style={styles.Tablerow}>
                <Text style={styles.cell1}>Time played</Text>
                <Text style={styles.cell}>{getTime(user.timePlayed)}</Text>
              </View>
            </View>
            ))}
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
    width: '98%',
    top: '8%',
    height: '15%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  gamesPlayedText: {
    marginTop: '25%',
    fontSize: 0.049 * Dimensions.get('window').width,
    lineHeight: 40,
    color: '#fff',
  },
  ProgressionText: {
    marginLeft: '5%',
    position: 'absolute',
    alignSelf: 'flex-start',
    fontSize: 0.09 * Dimensions.get('window').width,
    fontWeight: '800',
    top: 5,
    textAlign: 'left',
    color: 'gold',
  },
  ggcloseIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
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
    height: '100%',
    width: '95%',
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
    flex: 0.9,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfcentered: {
    alignSelf: 'center',
    marginTop: '22%',
    width:'92%',
  },
  Tablerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  cell: {
    flex: 0.3,
    textAlign: 'left',
    color:'#fff',
    fontSize: 0.049 * Dimensions.get('window').width,
    lineHeight: 40,
  },
  cell1:{
    flex: 0.6,
    textAlign: 'left',
    color:'#fff',
    fontSize: 0.049 * Dimensions.get('window').width,
    lineHeight: 40,
  },
});

export default ProgressionScreen;
