import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenWrapper from '../ScreenWrapper';
const YourTurn = ({navigation}) => {
  const [gameMap, setGameMap] = React.useState([
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('x');

  useEffect(() => {
    let aiMoveTimeout;
    if (currentPlayer === '0') {
      aiMoveTimeout = setTimeout(() => {
        const aiColumn = getAiMove(gameMap);

        for (let i = gameMap.length - 1; i >= 0; i--) {
          if (!gameMap[i][aiColumn]) {
            const newGameMap = [...gameMap];
            newGameMap[i][aiColumn] = '0'; // AI's move
            setGameMap(newGameMap);
            setCurrentPlayer('x'); // Switch back to player's turn
            break;
          }
        }
      }, 1000); // 1000 milliseconds (1 second) delay
    }

    return () => clearTimeout(aiMoveTimeout);
  }, [currentPlayer, gameMap]);

  const getAiMove = board => {
    const availableColumns = [];
    // Collect available columns
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
      if (!board[0][columnIndex]) {
        availableColumns.push(columnIndex);
      }
    }
    // Randomly choose a column from available columns
    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    return availableColumns[randomIndex];
  };

  const onPress = (rowIndex, columnIndex) => {
    //console.warn('hello ', rowIndex, columnIndex);
    if (currentPlayer === 'x') {
      for (let i = gameMap.length - 1; i >= 0; i--) {
        if (!gameMap[i][columnIndex]) {
          // Add the image to the cell
          const newGameMap = [...gameMap];
          newGameMap[i][columnIndex] = currentPlayer;
          setGameMap(newGameMap);
          setCurrentPlayer('0');
          break;
        }
      }
    }
    //const aiColumn = getAiMove(gameMap);
    // if (currentPlayer === '0') {
    //   for (let i = gameMap.length - 1; i >= 0; i--) {
    //     if (!gameMap[i][aiColumn]) {
    //       const newGameMap = [...gameMap];
    //       newGameMap[i][aiColumn] = currentPlayer;
    //       setGameMap(newGameMap);
    //       setCurrentPlayer('x'); // Switch back to player's turn
    //       break;
    //     }
    //   }
    // }
  };
  return (
    <ScreenWrapper>
      <View style={styles.yourTurn}>
        <View style={styles.firstSubRow}>
          <Image
            style={styles.headerIcon}
            resizeMode="contain"
            source={
              currentPlayer === 'x'
                ? require('../assets/header.png')
                : require('../assets/header1.png')
            }
          />
        </View>
        <View style={styles.secondSubRow}>
          <ImageBackground
            source={require('../assets/boardfour.png')}
            resizeMode="contain"
            style={styles.gameboard}>
            <View style={[styles.map]}>
              {/* Iterate over each column */}
              {gameMap[0].map((_, columnIndex) => (
                <View style={styles.column} key={`column-${columnIndex}`}>
                  {/* Iterate over each cell in the column */}
                  {gameMap.map((row, rowIndex) => (
                    <Pressable
                      onPress={() => onPress(rowIndex, columnIndex)}
                      style={styles.cell}
                      key={`cell-${columnIndex}-${rowIndex}`}>
                      {row[columnIndex] === 'x' && (
                        <Image
                          style={styles.piece1}
                          resizeMode="contain"
                          source={require('../assets/greenpiece.png')}
                        />
                      )}
                      {row[columnIndex] === '0' && (
                        <Image
                          style={styles.piece2}
                          resizeMode="contain"
                          source={require('../assets/redpiece.png')}
                        />
                      )}
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </ImageBackground>
        </View>

        <View style={styles.thirdSubRow}>
          <Text style={styles.yourTurn1}>
            {currentPlayer === 'x' ? 'Your turn' : "Opponent's turn"}
          </Text>
          {currentPlayer === 'x' ? (
            <LinearGradient
              style={styles.yourTurnChild}
              locations={[0.47, 0.47, 1]}
              colors={['#007700', '#fff', '#fff']}
              useAngle={true}
              angle={-90}
            />
          ) : (
            <LinearGradient
              style={styles.yourTurnChild}
              locations={[0.47, 0.47, 1]}
              colors={['#750000', '#fff', '#fff']}
              useAngle={true}
              angle={-90}
            />
          )}

          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.yourTurn1}>Home</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  yourTurn1: {
    marginTop: '10%',
    //fontSize: FontSize.size_5xl,
    //fontFamily: FontFamily.anybodyRegular,
    //color: Color.white,
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: 201,
    height: 42,
    color: '#fff',
    fontSize: 20,
  },
  headerIcon: {
    alignSelf: 'center',
    width: '88%',
    height: 98,
  },
  yourTurnChild: {
    alignSelf: 'center',
    borderRadius: 50,
    width: '85%',
    height: '10%',
    backgroundColor: 'transparent',
  },
  yourTurn: {
    marginTop: '10%',
    flex: 1,
    width: '100%',
    height: 0.844 * Dimensions.get('window').height,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  firstSubRow: {
    flex: 0.25,
  },
  secondSubRow: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdSubRow: {
    flex: 0.2,
  },
  gameboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    left: '2%',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    width: '72%',
    alignSelf: 'center',
    aspectRatio: 1.15,
    marginBottom: '9%',
  },
  piece1: {
    width: '80%',
    height: '80%',
  },
  piece2: {
    width: '80%',
    height: '80%',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  cell: {
    flex: 0.5,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourTurn;
