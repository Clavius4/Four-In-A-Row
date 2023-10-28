import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

const getStyleValue = (key, value) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const UserFillIcon = ({
  userFillIconUserFill,
  userFillIconPosition,
  userFillIconWidth,
  userFillIconHeight,
  userFillIconTop,
  userFillIconLeft,
  userFillIconBorderRadius,
}) => {
  const userFillIconStyle = useMemo(() => {
    return {
      ...getStyleValue('position', userFillIconPosition),
      ...getStyleValue('width', userFillIconWidth),
      ...getStyleValue('height', userFillIconHeight),
      ...getStyleValue('top', userFillIconTop),
      ...getStyleValue('left', userFillIconLeft),
      ...getStyleValue('borderRadius', userFillIconBorderRadius),
    };
  }, [
    userFillIconPosition,
    userFillIconWidth,
    userFillIconHeight,
    userFillIconTop,
    userFillIconLeft,
    userFillIconBorderRadius,
  ]);

  return (
    <Image
      style={[styles.userFillIcon, userFillIconStyle]}
      resizeMode="cover"
      source={userFillIconUserFill}
    />
  );
};

const styles = StyleSheet.create({
  userFillIcon: {
    width: 90,
    height: 80,
  },
});

export default UserFillIcon;
