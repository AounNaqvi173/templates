import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const Mic = ({ color, size = 20, ...props }: Props) => (
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
      d="M6 5C6 2.79086 7.79086 1 10 1C12.2091 1 14 2.79086 14 5V9C14 11.2091 12.2091 13 10 13C7.79086 13 6 11.2091 6 9V5ZM10 2.5C8.61929 2.5 7.5 3.61929 7.5 5V9C7.5 10.3807 8.61929 11.5 10 11.5C11.3807 11.5 12.5 10.3807 12.5 9V5C12.5 3.61929 11.3807 2.5 10 2.5ZM3.75 8.25C4.16421 8.25 4.5 8.58579 4.5 9C4.5 12.0376 6.96243 14.5 10 14.5C13.0376 14.5 15.5 12.0376 15.5 9C15.5 8.58579 15.8358 8.25 16.25 8.25C16.6642 8.25 17 8.58579 17 9C17 12.6126 14.2633 15.5861 10.75 15.9603V17.5H13.25C13.6642 17.5 14 17.8358 14 18.25C14 18.6642 13.6642 19 13.25 19H6.75C6.33579 19 6 18.6642 6 18.25C6 17.8358 6.33579 17.5 6.75 17.5H9.25V15.9603C5.73668 15.5861 3 12.6126 3 9C3 8.58579 3.33579 8.25 3.75 8.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
