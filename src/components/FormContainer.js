import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Property1Variant4Icon from './Property1Variant4Icon';
import Property1Variant2 from './Property1Variant2';
import {Border} from '../GlobalStyles';

const FormContainer = () => {
  return (
    <View style={styles.board}>
      <Property1Variant4Icon
        imageDimensions={require('../assets/property-1default2.png')}
        propTop={26}
        propLeft={38}
        propWidth={305}
        propHeight={240}
      />
      <Property1Variant2
        gameBoard={require('../assets/game-board.png')}
        piece1={require('../assets/piece1.png')}
        piece2={require('../assets/piece2.png')}
        piece11={require('../assets/piece1.png')}
        piece12={require('../assets/piece1.png')}
        leftRail={require('../assets/left-rail.png')}
        rightRail={require('../assets/right-rail.png')}
      />
      <Property1Variant4Icon
        imageDimensions={require('../assets/property-1variant31.png')}
        propTop={682}
        propLeft={38}
        propWidth={305}
        propHeight={240}
      />
      <Property1Variant4Icon
        imageDimensions={require('../assets/property-1variant4.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderRadius: Border.br_8xs,
    width: 360,
    height: 1316,
    overflow: 'hidden',
    zIndex: 0,
  },
});

export default FormContainer;
