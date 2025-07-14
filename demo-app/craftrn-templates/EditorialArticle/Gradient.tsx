import { ComponentType } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useStyles } from 'react-native-unistyles';

type Props = {
  height: number;
};

export const Gradient: ComponentType<Props> = ({ height }) => {
  const { theme } = useStyles();
  return (
    <Svg height={height} width="100%">
      <Defs>
        <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop
            offset="0%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="0"
          />
          <Stop
            offset="90%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="1"
          />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height={height}
        fill="url(#headerGradient)"
      />
    </Svg>
  );
};
