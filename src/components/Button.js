/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from '../styles/style';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({title, onpress}) => {
  return (
    <Pressable style={styles.button}
    onPress={onpress}>
      <View/>
      <View style={styles.rectangleParent}>
        <LinearGradient
          style={styles.frameChild}
          locations={[0, 1]}
          colors={['#5030DB', 'rgba(255, 255, 255, 0)']}
          useAngle={true}
          angle={180}
        />
        <View style={[styles.frameItem]} />
        <Image
          style={[styles.frameInner, styles.frameInnerLayout]}
          resizeMode="cover"
          source={require('../assets/ellipse-281.png')}
        />
        <Image
          style={[styles.ellipseIcon, styles.frameInnerLayout]}
          resizeMode="cover"
          source={require('../assets/ellipse-291.png')}
        />
        <LinearGradient
          style={[styles.rectangleLineargradient, styles.frameChild1Position]}
          locations={[0, 0.49, 1]}
          colors={['rgba(255, 255, 255, 0)', '#fff', 'rgba(255, 255, 255, 0)']}
          useAngle={true}
          angle={270}
        />
        <Text style={[styles.playNow, styles.playNowFlexBox]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
