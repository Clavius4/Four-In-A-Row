/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React,{useState,useEffect} from 'react';
import {View, Text, Pressable, Image,BackHandler,Modal,Alert,Linking} from 'react-native';
import styles from '../styles/style';
import PieceOne from '../components/PieceOne';
import PieceTwo from '../components/PieceTwo';
import Button from '../components/Button';
import ScreenWrapper from '../ScreenWrapper';
import { useFocusEffect } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-2';
import Purchases from 'react-native-purchases';
//import { SubscriptionProvider } from '../components/SubscriptionContext';
//import { useSubscription } from '../components/SubscriptionContext';
import UpdateStatus from '../components/UpdateStatus';

import board1 from '../assets/boardfour.png';
import greenPiece from '../assets/greenpiece.png';
import redPiece from '../assets/redpiece.png';
import wingreen from '../assets/wingreen.png';
import winred from '../assets/redwin.png';

import board2 from '../assets/boardtwo.png';
import bluePiece from '../assets/bluepiece.png';
import winblue from '../assets/bluewin.png';


import board3 from '../assets/boardthree.png';
import paleBlue from '../assets/palebluepiece.png';
import winpaleblue from '../assets/winpaleblue.png';

const HomeScreen = ({navigation}) => {
  let currentPlayer;
  const [modalVisible, setModalVisible] = useState(false);
  const [packages, setPackages] = useState([]);

  //const { setSubscriptionStatus } = useSubscription();

  const handleSubscriptionSuccess = () => {
   // setSubscriptionStatus(true);
    UpdateStatus(1);
  };

  useEffect(() => {
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.log('Error getting offers', e.message);
      }
    };
    getPackages();
  }, []);
  const handlePurchase = async (packag) => {
    try {
      const { customerInfo} = await Purchases.purchasePackage(packag);
      if (customerInfo.entitlements.active) {
        handleSubscriptionSuccess();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log('Error purchasing:', e.message);
      }
    }
  };
    useFocusEffect(
      React.useCallback(() => {
        const backAction = () => {
          BackHandler.exitApp();
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
        return () => {
          backHandler.remove();
        };
      }, [])
    );


    const GetPlayer = () => {
      return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase('progression.db');
        db.transaction(tx => {
          const query = 'SELECT turn FROM Turns';
          tx.executeSql(
            query,
            [],
            (_, results) => {
              const rows = results.rows;
              if (rows.length > 0) {
                const firstplayer = rows.item(0).turn;
                resolve(firstplayer); // Resolve the promise with the time value
              } else {
                resolve(0); // Resolve with 0 if no data is found
              }
            },
            (_, error) => {
              resolve(0);
            },
          );
        });
      });
    };
    const getPlayerValue = async () => {
      try {
        currentPlayer = await GetPlayer(); // Assign the result to the global variable
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getPlayerValue();
  const handlePress = () => {
    const db = SQLite.openDatabase('progression.db');
    let board;
    let pieceone;
    let piecetwo;
    let pieceonewin;
    let piecetwowin;
      db.transaction((tx) => {
        const query = 'SELECT Board FROM BoardTheme';
        tx.executeSql(query, [], (_, results) => {
          const rows = results.rows;
          if (rows.length > 0){
              const theme = rows.item(0).Board;
              if (theme === 'boardone'){
                board = board1;
                pieceone = greenPiece;
                piecetwo = redPiece;
                pieceonewin = wingreen;
                piecetwowin = winred;
                }
                else if (theme === 'boardtwo')
                {
                  board = board2;
                  pieceone = bluePiece;
                  piecetwo = redPiece;
                  pieceonewin = winblue;
                  piecetwowin = winred;
                }
                else if (theme === 'boardthree')
                {
                board = board3;
                pieceone = paleBlue;
                piecetwo = greenPiece;
                pieceonewin = winpaleblue;
                piecetwowin = wingreen;
                }
                navigation.navigate('Multiplayer', {asset:board,piece1:pieceone,piece2:piecetwo,pieceonewin:pieceonewin,piecetwowin:piecetwowin,cplayer:currentPlayer});
          }
        }, (_, error) => {
          console.error('Error:', error);
        });
      });
};
function getNames(name){
 if (name === '$rc_monthly')
 {
  return '1 Month';
 }
 else if (name === '$rc_three_month')
 {
  return '3 Months';
 }
 else if (name === '$rc_annual')
 {
  return '12 Months';
 }
}
const restore = async()=>{
  try {
    const rstore = await Purchases.restorePurchases();
    // ... check restored purchaserInfo to see if entitlement is now active
    console.log(rstore);
    setModalVisible(false);
  } catch (e) {
    Alert.alert(e.message);
  }
};
  return (
    <ScreenWrapper>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Subscribe To Remove Ads</Text>
          {packages.map((pack, index) => (
            <View key={index} style={styles.modalRow}>
              <Pressable style={styles.modalButton}
              onPress={()=>handlePurchase(pack)}
              >
              <Text style={styles.duration}>{getNames(pack.identifier)}</Text>
              <Text style={styles.price}>{pack.product.priceString}</Text>
              </Pressable>
            </View>
          ))}
          <View style={styles.lastrow}>
            <Pressable
            onPress={()=>restore()}>
              <Text style={styles.restore}>Restore</Text>
            </Pressable>
            <Pressable
            onPress={()=>Linking.openURL('https://www.privacypolicies.com/live/47faa86d-9749-45ed-b4d4-a4d905a01713')}>
              <Text style={styles.restore}>Terms</Text>
            </Pressable>
            <Pressable
            onPress={()=>Linking.openURL('https://www.privacypolicies.com/live/47faa86d-9749-45ed-b4d4-a4d905a01713')}>
               <Text style={styles.restore}>Privacy policy</Text>
            </Pressable>
          </View>
          <View style={[styles.cbtn]}>
          <Pressable
              style={[styles.cancelButton]}
              onPress={() => {setModalVisible(false);}}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.home}>
      <View style={[styles.row,{paddingHorizontal:'0%'}]}>
          <Pressable onPress={() => navigation.navigate('Progression')}>
            <Image
              resizeMode="contain"
              source={require('../assets/piece21.png')}
            />
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              resizeMode="contain"
              source={require('../assets/ads.png')}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Image
              resizeMode="contain"
              source={require('../assets/piece11.png')}
            />
          </Pressable>
        </View>
        <View style={[styles.row, styles.HorizontalDistance]}>
          <PieceOne
            imageLabelId={require('../assets/piece12.png')}
            propTop={247}
            propBottom="unset"
            propHeight={62}
            propWidth={62}
            propRight="unset"
            propLeft={119}
            propMaxWidth="unset"
            propOverflow="unset"
            propMaxHeight="unset"
          />
          <PieceTwo
            property1Variant2={require('../assets/piece22.png')}
            propTop={245}
            propBottom="unset"
            propHeight={62}
            propWidth={62}
            propRight="unset"
            propLeft={209}
            propMaxWidth="unset"
            propOverflow="unset"
            propMaxHeight="unset"
          />
        </View>
        <View style={[styles.row, styles.centeredRow]}>
          <Text style={styles.logoText}>FOUR IN A ROW TOURNAMENTS</Text>
        </View>
        <View style={[styles.row, styles.centeredRow]}>
          <Button title="2 PLAYERS" onpress={() => handlePress()}/>
        </View>
        <View style={[styles.row, styles.centeredRow]}>
          <Button title="1 PLAYER" onpress={() => navigation.navigate('Levelselection')}/>
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default HomeScreen;
