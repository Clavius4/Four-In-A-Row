import React, {useMemo} from 'react';
import {Image} from 'react-native';

const getStyleValue = (key, value) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const Property1Variant4Icon = ({
  imageDimensions,
  propTop,
  propLeft,
  propWidth,
  propHeight,
}) => {
  const property1Variant4IconStyle = useMemo(() => {
    return {
      ...getStyleValue('top', propTop),
      ...getStyleValue('left', propLeft),
      ...getStyleValue('width', propWidth),
      ...getStyleValue('height', propHeight),
    };
  }, [propTop, propLeft, propWidth, propHeight]);

  return (
    <Image
      style={[property1Variant4IconStyle]}
      resizeMode="contain"
      source={imageDimensions}
    />
  );
};

export default Property1Variant4Icon;
