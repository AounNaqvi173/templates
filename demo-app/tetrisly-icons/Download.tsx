import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const Download = ({ color, size = 20, ...props }: Props) => (
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
      d="M10 1a.75.75 0 0 1 .75.75v8.787l1.991-1.838A.75.75 0 1 1 13.76 9.8l-3.25 3a.75.75 0 0 1-1.018 0l-3.25-3A.75.75 0 1 1 7.26 8.7l1.991 1.838V1.75A.75.75 0 0 1 10 1M1.75 13a.75.75 0 0 1 .75.75v2.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-2.5a.75.75 0 0 1 1.5 0v2.5A2.75 2.75 0 0 1 16.25 19H3.75A2.75 2.75 0 0 1 1 16.25v-2.5a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </Svg>
);
