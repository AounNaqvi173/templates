import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const ChevronUp = ({ color, size = 20, ...props }: Props) => (
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
      d="M10 6C10.205 6 10.401 6.08388 10.5425 6.23214L15.7925 11.7321C16.0785 12.0318 16.0675 12.5065 15.7679 12.7925C15.4682 13.0785 14.9935 13.0675 14.7075 12.7679L10 7.83621L5.29252 12.7679C5.00651 13.0675 4.53177 13.0785 4.23214 12.7925C3.93252 12.5065 3.92148 12.0318 4.20748 11.7321L9.45748 6.23214C9.59901 6.08388 9.79504 6 10 6Z"
      clipRule="evenodd"
    />
  </Svg>
);
