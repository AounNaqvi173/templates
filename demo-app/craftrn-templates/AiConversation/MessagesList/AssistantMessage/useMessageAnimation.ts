import { useEffect, useState } from 'react';
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
  const [initialAvailableSpace, setInitialAvailableSpace] = useState<
    number | null
  >(null);
  const [hasSpaceChanged, setHasSpaceChanged] = useState(false);
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

    if (initialAvailableSpace === null) {
      setInitialAvailableSpace(availableSpace);
    }

    if (
      initialAvailableSpace !== null &&
      Math.abs(availableSpace - initialAvailableSpace) > 10 &&
      !hasSpaceChanged
    ) {
      setHasSpaceChanged(true);
      animatedMinHeight.value = withTiming(0, { duration: 0 });
      return;
    }

    if (hasSpaceChanged) {
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
    animatedMinHeight,
    initialAvailableSpace,
    hasSpaceChanged,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    minHeight: animatedMinHeight.value,
  }));

  return {
    animatedStyle,
  };
};
