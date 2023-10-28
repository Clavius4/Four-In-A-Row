/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';
import ScreenWrapper from '../ScreenWrapper';
import updateDb from '../components/updateDb';
import getAiMove from '../components/getAiMove';
import identifyWinningPieces from '../components/identifyWinningPieces';
import checkForWin from '../components/checkForWin';
import Sound from 'react-native-sound';
import {useSoundContext} from '../components/SoundContext';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import updatePlayer from '../components/UpdatePlayer';
import Purchases from 'react-native-purchases';
//import SQLite from 'react-native-sqlite-2';
//import {useSubscription} from '../components/SubscriptionContext';

const SinglePlayer = ({navigation, route}) => {
  const [gameMap, setGameMap] = React.useState([
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ]);
  const [peblesound, setPebbleSound] = useState(null);
  const [winningSound, setWinningSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [timeOnScreen, setTimeOnScreen] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(route.params.cplayer);
  const [player] = useState(route.params.cplayer);
  const [winStatus, setWinStatus] = useState(null);
  const [level] = useState(route.params.selectedLevel);
  const [asset] = useState(route.params.asset);
  const [pieceone] = useState(route.params.piece1);
  const [piecetwo] = useState(route.params.piece2);
  const [pieceonewin] = useState(route.params.pieceonewin);
  const [piecetwowin] = useState(route.params.piecetwowin);
  const [modalVisible, setModalVisible] = useState(false);
  const {soundvolume} = useSoundContext();
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-2200018159346676/5752624824';
  const adUnitIdInterstitial = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-2200018159346676/3268279328';
  const {isLoaded, load, show} = useInterstitialAd(adUnitIdInterstitial, {
    tagForChildDirectedTreatment: true,
    maxAdContentRating: 'G',
  });
  const [isSubscribed,setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        //console.log('hii ni nini: ' + Object.entries(customerInfo.entitlements.active).length);
        if (Object.entries(customerInfo.entitlements.active).length > 0) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (e) {
        setIsSubscribed(false);
      }
    };
    checkSubscription(); // Call the function when the component mounts
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  Sound.setCategory('Ambient');
  useEffect(() => {
    const clickSound = new Sound('pebble.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load sound', error);
      } else {
        setPebbleSound(clickSound);
      }
    });
    return () => {
      if (peblesound) {
        peblesound.release();
      }
    };
  }, []);
  const playSound = () => {
    if (peblesound) {
      peblesound.setVolume(soundvolume);
      peblesound.play();
    }
  };

  useEffect(() => {
    const WinSound = new Sound('win.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load sound', error);
      } else {
        setWinningSound(WinSound);
      }
    });
    return () => {
      if (winningSound) {
        winningSound.release();
      }
    };
  }, []);
  const playwinSound = () => {
    if (winningSound) {
      winningSound.setVolume(soundvolume);
      winningSound.play();
    }
  };

  useEffect(() => {
    const lose = new Sound('lose.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load lose sound', error);
      } else {
        setLoseSound(lose);
      }
    });
    return () => {
      if (winningSound) {
        winningSound.release();
      }
    };
  }, []);
  const playLoseSound = () => {
    loseSound.setVolume(soundvolume);
    loseSound.play();
  };

  useEffect(() => {
    let timer;
    if (
      !(winStatus === 'LOSE' || winStatus === 'WIN' || winStatus === 'DRAW')
    ) {
      timer = setInterval(() => {
        setTimeOnScreen(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let aiMoveTimeout;
    if (currentPlayer === '0') {
      aiMoveTimeout = setTimeout(() => {
        const aiColumn = getAiMove([...gameMap], level, '0');
        for (let i = gameMap.length - 1; i >= 0; i--) {
          if (!gameMap[i][aiColumn]) {
            const newGameMap = [...gameMap];
            newGameMap[i][aiColumn] = '0'; // AI's move
            setGameMap(newGameMap);
            playSound();
            const hasWon = checkForWin(newGameMap, '0');
            if (hasWon) {
              setWinStatus('LOSE');
              playLoseSound();
              updateDb('LOSE', timeOnScreen);
              const winningPieces = identifyWinningPieces(newGameMap, '0');
              applyLoseStyle(winningPieces);
              setCurrentPlayer(null);
              handleNavigation();
              return;
            } else {
              const availableColumns = [];
              for (
                let columnIndex = 0;
                columnIndex < gameMap[0].length;
                columnIndex++
              ) {
                if (!gameMap[0][columnIndex]) {
                  availableColumns.push(columnIndex);
                }
              }
              if (availableColumns.length === 0) {
                setWinStatus('DRAW');
                updateDb('DRAW', timeOnScreen);
                setCurrentPlayer(null);
                handleNavigation();
                return;
              }
            }
            setCurrentPlayer('x');
            break;
          }
        }
      }, 1000);
    }
    return () => clearTimeout(aiMoveTimeout);
  }, [currentPlayer, gameMap]);

  const handleNavigation = () => {
    setTimeout(() => {
      setModalVisible(true);
    }, 1500); // 1500 milliseconds (1.5 seconds)
  };

  const applyLoseStyle = winningPieces => {
    for (const piece of winningPieces) {
      const {row, col} = piece;
      gameMap[row][col] = 'l';
    }
    setGameMap([...gameMap]);
  };

  const applyWinningStyle = winningPieces => {
    for (const piece of winningPieces) {
      const {row, col} = piece;
      gameMap[row][col] = 'w';
    }
    setGameMap([...gameMap]);
  };

  function getText(status) {
    if (status === 'WIN') {
      return 'YOU WON!';
    } else if (status === 'LOSE') {
      return 'YOU LOSE!';
    } else if (status === 'DRAW') {
      return 'DRAW!';
    }
  }
  function showText() {
    if (currentPlayer === 'x' && winStatus === null) {
      return 'Your Turn';
    } else if (currentPlayer === '0' && winStatus === null) {
      return 'Opponent`s turn';
    } else {
      return;
    }
  }

  const onPress = (rowIndex, columnIndex) => {
    if (currentPlayer === 'x') {
      for (let i = gameMap.length - 1; i >= 0; i--) {
        if (!gameMap[i][columnIndex]) {
          const newGameMap = [...gameMap];
          newGameMap[i][columnIndex] = currentPlayer;
          setGameMap(newGameMap);
          playSound();
          const hasWon = checkForWin(newGameMap, currentPlayer);
          if (hasWon) {
            setWinStatus('WIN');
            playwinSound();
            updateDb('WIN', timeOnScreen);
            const winningPieces = identifyWinningPieces(newGameMap, 'x');
            applyWinningStyle(winningPieces);
            //setCurrentPlayer(null);
            handleNavigation();
            // show();
            return;
          } else {
            const availableColumns = [];
            // Collect available columns
            for (let colIndex = 0; colIndex < gameMap[0].length; colIndex++) {
              if (!gameMap[0][colIndex]) {
                availableColumns.push(colIndex);
              }
            }
            if (availableColumns.length === 0) {
              setWinStatus('DRAW');
              updateDb('DRAW', timeOnScreen);
              //setCurrentPlayer(null);
              handleNavigation();
              // show();
              return;
            }
          }
          setCurrentPlayer('0');
          break;
        }
      }
    }
  };

  const resetGame = () => {
    setGameMap([
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ]);
    setTimeOnScreen(0);
    // setCurrentPlayer('x');
    setWinStatus(null);
    setModalVisible(false);
    setCurrentPlayer(player);
  };

  return (
    <ScreenWrapper>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalRow}>
            <Text style={styles.modalmessage}>{getText(winStatus)}</Text>
          </View>
          <View style={[styles.modalRow]}>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                if (isLoaded && !isSubscribed) {
                  show();
                }
                resetGame();
                navigation.navigate('Singleplayer', {selectedLevel: level});
              }}>
              <Text style={[styles.replayBtn]}>Replay</Text>
            </Pressable>
          </View>

          <View style={[styles.modalRow]}>
            <Pressable
              style={[styles.modalButton]}
              onPress={() => {
                if (isLoaded && !isSubscribed) {
                  show();
                }
                setModalVisible(false);
                updatePlayer(player);
                navigation.navigate('Home');
              }}>
              <Text style={styles.homeBtn}>Home</Text>
            </Pressable>
          </View>

          <View style={[styles.modalRow]}>
            <Pressable
              style={[styles.modalButton]}
              onPress={() => {
                if (isLoaded && !isSubscribed) {
                  show();
                }
                updatePlayer(player);
                setModalVisible(false);
                navigation.navigate('Levelselection');
              }}>
              <Text style={styles.levelBtn}>Change level</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.yourTurn}>
        <View style={styles.firstSubRow}>
          <View style={[styles.column, styles.firstTwoColumns]}>
            <View style={styles.columnContent}>
              <Image
                // resizeMode="contain"
                // style={styles.pieces}
                source={pieceone}
              />
            </View>
            <View style={styles.columnContent}>
              <Text style={styles.yourTurn1}>You</Text>
            </View>
          </View>
          <View style={[styles.column, styles.centeredColumn]}>
            <View style={styles.columnContent}>
              <Image
                source={
                  currentPlayer === 'x'
                    ? require('../assets/versus.png')
                    : require('../assets/versus2.png')
                }
              />
            </View>
            <View style={styles.columnContent}>
              <Text style={styles.yourTurn1}>Vs</Text>
            </View>
          </View>
          <View style={[styles.column, styles.lastTwoColumns]}>
            <View style={styles.columnContent}>
              <Image
                // resizeMode="contain"
                // style={styles.pieces}
                source={piecetwo}
              />
            </View>
            <View style={styles.columnContent}>
              <Text style={styles.yourTurn1}>{level}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.afterfirstSubRow}>
          <Text style={styles.winstatus}>{winStatus}</Text>
        </View> */}
        <View style={styles.secondSubRow}>
          <ImageBackground
            source={asset}
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
                          source={pieceone}
                        />
                      )}
                      {row[columnIndex] === 'w' && (
                        <Image
                          style={styles.piece}
                          resizeMode="contain"
                          source={pieceonewin}
                        />
                      )}
                      {row[columnIndex] === 'l' && (
                        <Image
                          style={styles.piece}
                          resizeMode="contain"
                          source={piecetwowin}
                        />
                      )}
                      {row[columnIndex] === '0' && (
                        <Image
                          style={styles.piece2}
                          resizeMode="contain"
                          source={piecetwo}
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
          <Text style={styles.yourTurn1}>{showText()}</Text>
          {/* <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.yourTurn1}>Home</Text>
          </Pressable> */}
        </View>
        <View style={styles.fourthRow}>
          {isSubscribed === false && (
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                maxAdContentRating: 'G',
                tagForChildDirectedTreatment: true,
              }}
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  yourTurn1: {
    marginTop: '3%',
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
  },
  piece: {
    width: '110%',
    height: '110%',
  },
  level: {
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: 130,
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
    flex: 1,
    width: '100%',
    height: 0.844 * Dimensions.get('window').height,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  firstSubRow: {
    flex: 0.27,
    alignSelf: 'center',
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'center', // Adjust this property as needed
    alignItems: 'center', // Align items vertically in the center
  },
  pieces: {
    width: '70%',
    height: '70%',
  },
  // afterfirstSubRow: {
  //   flex: 0.1,
  // },
  secondSubRow: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdSubRow: {
    flex: 0.08,
  },
  fourthRow: {
    flex: 0.15,
    position: 'absolute',
    bottom: 0,
  },
  columnContent: {
    alignItems: 'center', // Center the content horizontally
  },
  gameboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  map: {
    marginLeft: '4%',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    width: '77%',
    alignSelf: 'center',
    aspectRatio: 1.15,
    marginBottom: '9%',
    maxWidth: '77%',
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
  firstTwoColumns: {
    flex: 1,
    marginRight: 'auto',
  },
  lastTwoColumns: {
    marginLeft: 'auto',
    flex: 1,
  },
  centeredColumn: {
    flex: 1, // This will make the centered column take equal space
    alignItems: 'center', // Center its content vertically
  },
  cell: {
    flex: 0.5,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winstatus: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 0.09 * Dimensions.get('window').width,
    lineHeight: 40,
  },
  modalContainer: {
    alignSelf: 'center',
    width: '90%',
    marginLeft: '2%',
    marginTop: 0.25 * Dimensions.get('window').height,
    flex: 0.65,
    flexDirection: 'column',
    // borderColor: 'pink',
    // borderWidth: 1,
    //borderRadius:30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalRow: {
    flex: 0.3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lastRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
  },
  modalmessage: {
    fontWeight: '900',
    color: 'gold',
    fontSize: 48,
  },
  modalButton: {
    height: '60%',
    width: '50%',
    backgroundColor: '#5030DB',
    borderColor: 'gold',
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
  },
  replayBtn: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 23,
    padding: 3,
  },
  homeBtn: {
    color: '#fff',
    textAlign: 'center',
    // alignSelf: 'center',
    fontSize: 23,
    // width:'49%',
    //   padding: '3%',
    //   backgroundColor: '#E80EB7',
    //   borderColor:'gold',
    //  borderRadius: 20,
    //  borderWidth:2,
  },
  levelBtn: {
    color: '#fff',
    textAlign: 'center',
    // alignSelf: 'center',
    fontSize: 23,
    // width:'50%',
    //padding: '3%',
    //   backgroundColor: '#E80EB7',
    //   borderColor:'gold',
    //  borderRadius: 20,
    //  borderWidth:2,
  },
});

export default SinglePlayer;
