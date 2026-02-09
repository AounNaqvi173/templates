import { Text } from '@/craftrn-ui/components/Text';
import { CheckCircleFill } from '@/tetrisly-icons/CheckCircleFill';
import React, { ReactElement, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};
export const ButtonSelection = ({
  onPress,
  isSelected,
  isPopular,
  leftElement,
  rightElement,
}: {
  onPress: () => void;
  isSelected?: boolean;
  isPopular?: boolean;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
}) => {
  const { theme } = useUnistyles();

  const animationValue = useSharedValue(isSelected ? 1 : 0);
  const scaleAnimation = useSharedValue(isSelected ? 1 : 0.8);

  useEffect(() => {
    animationValue.value = withTiming(isSelected ? 1 : 0, ANIMATION_CONFIG);
    scaleAnimation.value = withTiming(isSelected ? 1 : 0.8, ANIMATION_CONFIG);
  }, [isSelected, animationValue, scaleAnimation]);

  const checkIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animationValue.value,
    transform: [{ scale: scaleAnimation.value }],
  }));

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - animationValue.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animationValue.value,
      [0, 1],
      [theme.colors.backgroundElevated, theme.colors.interactiveSecondary],
    ),
  }));

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.button,
            !pressed && buttonAnimatedStyle,
            (pressed || isSelected) && styles.buttonPressed,
          ]}
        >
          {isPopular && (
            <View style={styles.popularBadge}>
              <Text variant="body3" style={styles.popularText}>
                Popular
              </Text>
            </View>
          )}
          <View>{leftElement}</View>
          <View style={styles.rightContainer}>
            {rightElement}
            <View style={styles.iconContainer}>
              <Animated.View
                style={[styles.unselectedCircle, circleAnimatedStyle]}
              />
              <Animated.View
                style={[styles.checkIconPosition, checkIconAnimatedStyle]}
              >
                <CheckCircleFill color={theme.colors.contentAccent} />
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  button: {
    height: 70,
    borderWidth: 1,
    borderColor: theme.colors.borderNeutral,
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.large,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonPressed: {
    borderColor: theme.colors.interactiveSecondaryContent,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: theme.colors.sunshine,
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xxsmall,
  },
  popularText: {
    color: theme.colors.black,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIconPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  unselectedCircle: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    borderColor: theme.colors.borderNeutralSecondary,
    borderWidth: 1,
    backgroundColor: theme.colors.backgroundElevated,
  },
}));
