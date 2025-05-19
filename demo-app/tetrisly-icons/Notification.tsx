import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const Notification = ({ color, size = 20, ...props }: Props) => (
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
      d="M16 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M13 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0M1 4.75A2.75 2.75 0 0 1 3.75 2H9a.75.75 0 0 1 0 1.5H3.75c-.69 0-1.25.56-1.25 1.25v11.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25V11a.75.75 0 0 1 1.5 0v5.25A2.75 2.75 0 0 1 15.25 19H3.75A2.75 2.75 0 0 1 1 16.25z"
      clipRule="evenodd"
    />
  </Svg>
);
