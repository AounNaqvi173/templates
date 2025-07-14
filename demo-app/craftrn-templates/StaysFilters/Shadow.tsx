import React from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export const Shadow = () => (
  <Svg>
    <Defs>
      <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="rgba(0, 0, 0, 0.2)" stopOpacity="0" />
        <Stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
  </Svg>
);
