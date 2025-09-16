import { buttonRoundConfig } from '@/craftrn-ui/components/ButtonRound';
import { Text } from '@/craftrn-ui/components/Text';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { ComponentType } from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

type AnimatedHeaderProps = {
  scrollPosition: SharedValue<number>;
  title: string;
  threshold: number;
};

/**
 * AnimatedHeader component that appears when scrolling past a certain threshold.
 * It uses the scrollPosition shared value to determine when to show the header.
 * The opacity is interpolated based on the scroll position and threshold value.
 */
export const AnimatedHeader: ComponentType<AnimatedHeaderProps> = ({
  scrollPosition,
  title,
  threshold,
}) => {
  const headerHeight = useHeaderHeight();
  const { theme } = useUnistyles();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollPosition.value,
      [0, threshold, threshold + 50],
      [0, 0, 1],
      'clamp',
    );
    return {
      opacity,
    };
  }, [scrollPosition, threshold]);

  return (
    <Animated.View
      style={[
        styles.header,
        headerAnimatedStyle,
        {
          paddingLeft:
            theme.spacing.large * 2 + buttonRoundConfig.medium.buttonSize,
          height: headerHeight,
          paddingTop: UnistylesRuntime.insets.top - theme.spacing.xsmall,
          shadowColor: theme.colors.shadowPrimary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
      ]}
    >
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create(theme => ({
  header: {
    paddingRight: theme.spacing.large,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    zIndex: 10,
    elevation: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
}));
