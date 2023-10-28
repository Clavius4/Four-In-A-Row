/* eslint-disable prettier/prettier */
import React from 'react';
import {LinearGradient} from 'react-native-linear-gradient';

const ScreenWrapper = ({children}) => (
  <LinearGradient
    colors={['#2C014B', '#3F015B', '#700285', '#31014F', '#2C014B']}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </LinearGradient>
);

export default ScreenWrapper;
