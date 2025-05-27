import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const AnimatedKeyboardView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const viewStyle = StyleSheet.flatten(style || []);
  const { paddingBottom } = StyleSheet.flatten(style || []);
  const paddingBottomValue =
    typeof paddingBottom === 'number' ? paddingBottom : 0;

  // useAnimatedKeyboard is an experimental feature on Android
  // This creates a jumpy animation on the navigation bar when transitioning to the screen
  // Consider using `react-native-keyboard-controller` as it provides better keyboard handling on Android
  // https://github.com/software-mansion/react-native-reanimated/issues/6906
  const keyboard = useAnimatedKeyboard();

  const animatedStyle = useAnimatedStyle(() => {
    const denominator = keyboard.height.value + paddingBottomValue;
    return {
      paddingBottom:
        keyboard.height.value +
        paddingBottomValue *
          (denominator === 0 ? 1 : 1 - keyboard.height.value / denominator),
    };
  }, [paddingBottomValue, keyboard.height.value]);

  return (
    <Animated.View style={[viewStyle, animatedStyle]}>{children}</Animated.View>
  );
};
