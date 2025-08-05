import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const ArrowUp = ({ color, size = 20, ...props }: Props) => (
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
      d="M9.48598 3.20385C9.77477 2.93205 10.2252 2.93205 10.514 3.20385L14.764 7.20385C15.0657 7.48774 15.08 7.96239 14.7962 8.26402C14.5123 8.56565 14.0376 8.58004 13.736 8.29615L10.75 5.48582L10.75 16.25C10.75 16.6642 10.4142 17 10 17C9.58579 17 9.25 16.6642 9.25 16.25L9.25 5.48582L6.26403 8.29615C5.9624 8.58004 5.48774 8.56565 5.20385 8.26402C4.91996 7.96239 4.93435 7.48774 5.23598 7.20385L9.48598 3.20385Z"
      clipRule="evenodd"
    />
  </Svg>
);
