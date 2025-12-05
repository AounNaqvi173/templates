import { useEffect, useState } from 'react';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const animationConfig = {
  expandDuration: 1000,
  contractDuration: 1000,
  newMessageDuration: 300,
} as const;

export const useMessageAnimation = (
  isNewMessage: boolean,
  availableSpace?: number,
) => {
  const { progress } = useReanimatedKeyboardAnimation();
  const [hasKeyboardChanged, setHasKeyboardChanged] = useState(false);
  const [initialKeyboardProgress, setInitialKeyboardProgress] = useState<
    number | null
  >(null);
  const animatedMinHeight = useSharedValue(0);

  useEffect(() => {
    if (availableSpace === undefined) {
      const targetHeight = isNewMessage ? 0 : 0;
      const duration = isNewMessage
        ? animationConfig.newMessageDuration
        : animationConfig.contractDuration;
      const easing = isNewMessage
        ? Easing.out(Easing.exp)
        : Easing.in(Easing.exp);
      animatedMinHeight.value = withTiming(targetHeight, { duration, easing });
      return;
    }

    if (initialKeyboardProgress === null) {
      setInitialKeyboardProgress(progress.value);
    }

    if (
      initialKeyboardProgress !== null &&
      Math.abs(progress.value - initialKeyboardProgress) > 0.1 &&
      !hasKeyboardChanged
    ) {
      setHasKeyboardChanged(true);
      animatedMinHeight.value = withTiming(0, { duration: 0 });
      return;
    }

    if (hasKeyboardChanged) {
      return;
    }

    const targetHeight = isNewMessage ? availableSpace : 0;
    const duration = isNewMessage
      ? animationConfig.expandDuration
      : animationConfig.contractDuration;
    const easing = isNewMessage
      ? Easing.out(Easing.exp)
      : Easing.in(Easing.exp);
    animatedMinHeight.value = withTiming(targetHeight, { duration, easing });
  }, [
    isNewMessage,
    availableSpace,
    progress.value,
    animatedMinHeight,
    initialKeyboardProgress,
    hasKeyboardChanged,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    minHeight: animatedMinHeight.value,
  }));

  return {
    animatedStyle,
  };
};
