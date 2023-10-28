import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

const getStyleValue = (key, value) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const PieceOne = ({
  imageLabelId,
  propTop,
  propBottom,
  propHeight,
  propWidth,
  propRight,
  propLeft,
  propMaxWidth,
  propOverflow,
  propMaxHeight,
}) => {
  const property1Variant3IconStyle = useMemo(() => {
    return {
      ...getStyleValue('top', propTop),
      ...getStyleValue('bottom', propBottom),
      ...getStyleValue('height', propHeight),
      ...getStyleValue('width', propWidth),
      ...getStyleValue('right', propRight),
      ...getStyleValue('left', propLeft),
      ...getStyleValue('maxWidth', propMaxWidth),
      ...getStyleValue('overflow', propOverflow),
      ...getStyleValue('maxHeight', propMaxHeight),
    };
  }, [
    propTop,
    propBottom,
    propHeight,
    propWidth,
    propRight,
    propLeft,
    propMaxWidth,
    propOverflow,
    propMaxHeight,
  ]);

  return (
    <Image
      //style={[styles.property1variant3Icon, property1Variant3IconStyle]}
      resizeMode="cover"
      source={imageLabelId}
    />
  );
};

const styles = StyleSheet.create({
  property1variant3Icon: {
    position: 'absolute',
    height: '10.44%',
    width: '60.78%',
    top: '30.98%',
    right: '19.61%',
    bottom: '58.59%',
    left: '19.61%',
    maxWidth: '100%',
    overflow: 'hidden',
    maxHeight: '100%',
  },
});

export default PieceOne;
