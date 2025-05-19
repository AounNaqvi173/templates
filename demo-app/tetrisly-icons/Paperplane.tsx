import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const Paperplane = ({ color, size = 20, ...props }: Props) => (
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
      d="M18.673 1.13c.235.16.359.44.32.722l-2 14.5a.75.75 0 0 1-.998.603l-4.8-1.738-2.052 3.419a.75.75 0 0 1-1.373-.212l-1.158-4.866-5.117-1.853a.75.75 0 0 1-.112-1.36l16.5-9.25a.75.75 0 0 1 .79.035M8.298 14.17l.504 2.117.954-1.59zm.308-1.484 8.59-8.785-1.563 11.33zm5.461-7.73-7.01 7.17-3.512-1.272z"
      clipRule="evenodd"
    />
  </Svg>
);
