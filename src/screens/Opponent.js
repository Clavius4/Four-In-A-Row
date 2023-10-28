import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Property1Variant4Icon from '../components/Property1Variant4Icon';
import {FontSize, FontFamily, Color, Border} from '../GlobalStyles';

const Opponent = () => {
  return (
    <View style={styles.opponent}>
      <Image
        style={styles.headerIcon}
        resizeMode="cover"
        source={require('../assets/header1.png')}
      />
      <Text style={styles.opponentsTurn}>Opponent`s turn</Text>
      <LinearGradient
        style={styles.opponentChild}
        locations={[0.47, 0.47, 1]}
        colors={['#fff829', '#000', '#000']}
        useAngle={true}
        angle={-90}
      />
      <Property1Variant4Icon
        imageDimensions={require('../assets/board.png')}
        propTop={273}
        propLeft={0}
        propWidth={428}
        propHeight={338}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    top: 147,
    left: 46,
    width: 312,
    height: 98,
    position: 'absolute',
  },
  opponentsTurn: {
    top: 700,
    left: 90,
    fontSize: FontSize.size_5xl,
    lineHeight: 9,
    fontFamily: FontFamily.anybodyRegular,
    color: Color.white,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 206,
    height: 44,
    position: 'absolute',
  },
  opponentChild: {
    top: 640,
    left: 30,
    borderRadius: Border.br_41xl,
    width: 338,
    height: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  opponent: {
    flex: 1,
    width: '100%',
    height: 844,
    overflow: 'hidden',
  },
});

export default Opponent;
