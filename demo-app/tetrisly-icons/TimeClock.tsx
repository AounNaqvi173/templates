import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const TimeClock = ({ color, size = 20, ...props }: Props) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M1 10a9 9 0 1 1 18 0 9 9 0 0 1-18 0m8.75-5a.75.75 0 0 1 .75.75V9.5h1.75a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75v-4.5A.75.75 0 0 1 9.75 5"
      clipRule="evenodd"
    />
  </Svg>
);
