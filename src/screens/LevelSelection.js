/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Pressable,StyleSheet} from 'react-native';
import ScreenWrapper from '../ScreenWrapper';


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

import SQLite from 'react-native-sqlite-2';

const LevelSelection = ({navigation}) => {
  //const [player] = useState(Math.random());
  let currentPlayer;

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
            console.error('Error:', error);
            reject(error); // Reject the promise with the error
          },
        );
      });
    });
  };

  const getPlayerValue = async () => {
    try {
      currentPlayer = await GetPlayer(); // Assign the result to the global variable
      //console.log('Player value:', currentPlayer);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  getPlayerValue();

  const handlePress = (Level) => {
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
                //console.log('player: ' + currentPlayer);
                navigation.navigate('Singleplayer', {selectedLevel:Level,asset:board,piece1:pieceone,piece2:piecetwo,pieceonewin:pieceonewin,piecetwowin:piecetwowin,cplayer:currentPlayer});
          }
        }, (_, error) => {
          console.error('Error:', error);
        });
      });

};
  return (
    <ScreenWrapper>
      <View style="container">
        <Text style={styles.level}>Choose Level</Text>
        <Pressable style={styles.pressable} onPress={() => handlePress('Easy')}>
          <Text style={styles.levels}>Easy</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => handlePress('Medium')}>
          <Text style={styles.levels}>Medium</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => handlePress('Hard')}>
          <Text style={styles.levels}>Hard</Text>
        </Pressable>
      </View>
      {/* <View style={[styles.row, styles.centeredRow]}>
          <Button title="HOME" onpress={() => navigation.navigate('Home')}/>
        </View> */}
    </ScreenWrapper>
  );
};


const styles = StyleSheet.create({
    container: {
       width:'100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      level: {
        fontSize: 35,
        alignSelf:'center',
        color:'#fff',
        marginBottom: '15%',
        fontWeight:'800',
      },
      levels:{
        color:'#fff',
        textAlign:'center',
        alignSelf:'center',
        fontSize: 23,
        width:'75%',
        padding: '3%',
        backgroundColor: '#5030DB',
        borderColor: 'gold',
        borderRadius: 30,
        borderWidth: 2,
        marginBottom: '10%',
      },
      pressable: {
      },
      centeredRow:{
        justifyContent:'center',
      },
      row: {
        marginTop:'5%',
        flex:0.18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
});
export default LevelSelection;
