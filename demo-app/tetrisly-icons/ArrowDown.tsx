import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const ArrowDown = ({ color, size = 20, ...props }: Props) => (
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
      d="M10 3C10.4142 3 10.75 3.33579 10.75 3.75V14.5142L13.736 11.7038C14.0376 11.42 14.5123 11.4343 14.7962 11.736C15.08 12.0376 15.0657 12.5123 14.764 12.7962L10.514 16.7962C10.2252 17.068 9.77477 17.068 9.48598 16.7962L5.23598 12.7962C4.93435 12.5123 4.91996 12.0376 5.20385 11.736C5.48774 11.4343 5.9624 11.42 6.26403 11.7038L9.25 14.5142V3.75C9.25 3.33579 9.58579 3 10 3Z"
      clipRule="evenodd"
    />
  </Svg>
);
