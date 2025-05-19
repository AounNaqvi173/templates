import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & {
  color: string;
  size?: number;
};

export const Bell = ({ color, size = 20, ...props }: Props) => (
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
      d="M4.56 5.176C4.806 2.703 6.924 1 9.366 1h1.268c2.442 0 4.56 1.703 4.806 4.176v.004l.423 4.496v.002c.14 1.393.741 2.799 1.69 3.808.52.551.524 1.315.323 1.862-.202.548-.72 1.152-1.535 1.152h-3.383a3 3 0 0 1-5.917 0H3.66c-.815 0-1.333-.604-1.535-1.152s-.197-1.31.322-1.862c.95-1.009 1.551-2.415 1.69-3.808zM16.34 15h.007q.003-.001.023-.016a.481.481 0 0 0 .127-.375c-.008-.06-.026-.085-.035-.095-1.197-1.27-1.923-2.995-2.091-4.69V9.82l-.424-4.496v-.002C13.784 3.698 12.389 2.5 10.634 2.5H9.365c-1.755 0-3.15 1.198-3.313 2.822v.002l-.424 4.5c-.168 1.695-.895 3.42-2.09 4.69-.01.01-.028.036-.036.095a.48.48 0 0 0 .127.375.1.1 0 0 0 .023.015l.006.001zm-7.755 1.5a1.5 1.5 0 0 0 2.83 0z"
      clipRule="evenodd"
    />
  </Svg>
);
