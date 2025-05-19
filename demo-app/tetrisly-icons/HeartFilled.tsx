import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const HeartFilled = ({ color, size = 20, ...props }: Props) => (
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
      d="m13.3231,2.03653c1.4842,-0.18781 2.9404,0.35708 4.0295,1.39777l0.0022,0.00202c2.1936,2.11241 2.1936,5.66016 0,7.77258l-6.8346,6.5813c-0.2904,0.2797 -0.74999,0.2797 -1.04043,0l-6.83452,-6.5813c-2.19366,-2.11242 -2.19366,-5.66017 0,-7.77258l0.0021,-0.00202l0,0c1.08918,-1.0407 2.54538,-1.58556 4.02955,-1.39774c1.20991,0.15311 2.37126,0.7839 3.32309,1.91291c0.95181,-1.12904 2.11321,-1.75984 3.32311,-1.91294z"
      clipRule="evenodd"
    />
  </Svg>
);
