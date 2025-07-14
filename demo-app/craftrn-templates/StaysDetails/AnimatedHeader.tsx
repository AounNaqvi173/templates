import { useHeaderHeight } from '@react-navigation/elements';
import React, { ComponentType } from 'react';
import { Platform } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type AnimatedHeaderProps = {
  scrollPosition: SharedValue<number>;
  carouselHeight: number;
};

export const AnimatedHeader: ComponentType<AnimatedHeaderProps> = ({
  scrollPosition,
  carouselHeight,
}) => {
  const headerHeight = useHeaderHeight();
  const { styles } = useStyles(stylesheet);

  const headerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollPosition.value,
        [0, carouselHeight - 100, carouselHeight - 50],
        [0, 0, 1],
      ),
    }),
    [scrollPosition, carouselHeight],
  );

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <Animated.View
      style={[styles.header({ headerHeight }), headerAnimatedStyle]}
    />
  );
};

const stylesheet = createStyleSheet(theme => ({
  header: ({ headerHeight }: { headerHeight: number }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    zIndex: 1,
    marginTop: -headerHeight,
    height: headerHeight,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPrimary,
  }),
}));
