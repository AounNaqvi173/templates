import { buttonRoundConfig } from '@/craftrn-ui/components/ButtonRound';
import { Text } from '@/craftrn-ui/components/Text';
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
  title: string;
  gradientHeight: number;
};

export const AnimatedHeader: ComponentType<AnimatedHeaderProps> = ({
  scrollPosition,
  title,
  gradientHeight,
}) => {
  const headerHeight = useHeaderHeight();
  const { styles, theme } = useStyles(stylesheet);

  const headerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollPosition.value,
        [0, gradientHeight, gradientHeight + 50],
        [0, 0, 1],
      ),
    }),
    [scrollPosition, gradientHeight],
  );

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.header,
        headerAnimatedStyle,
        {
          marginTop: -headerHeight,
          paddingLeft:
            theme.spacing.large * 2 + buttonRoundConfig.buttonSizeMedium,
          height: headerHeight,
        },
      ]}
    >
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  header: {
    paddingRight: theme.spacing.large,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    zIndex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
}));
