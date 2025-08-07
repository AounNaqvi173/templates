import { useEffect, useState } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ScrollMetrics = {
  listHeight?: number;
  contentOffset?: number;
};

const animationConfig = {
  expandDuration: 1000,
  contractDuration: 1000,
  newMessageDuration: 300,
} as const;

export const useMessageAnimation = (
  isNewMessage: boolean,
  scrollMetrics: ScrollMetrics,
) => {
  const [initialListHeight, setInitialListHeight] = useState<number | null>(
    null,
  );
  const [hasListHeightChanged, setHasListHeightChanged] = useState(false);
  const animatedMinHeight = useSharedValue(0);

  const { listHeight, contentOffset } = scrollMetrics;

  useEffect(() => {
    const hasValidMeasurements =
      (listHeight ?? 0) > 0 && (contentOffset ?? 0) > 0;

    if (hasValidMeasurements && initialListHeight === null && listHeight) {
      setInitialListHeight(listHeight);
    }

    if (
      initialListHeight !== null &&
      listHeight !== initialListHeight &&
      !hasListHeightChanged
    ) {
      setHasListHeightChanged(true);
      animatedMinHeight.value = withTiming(0, { duration: 0 });
      return;
    }

    if (hasListHeightChanged) {
      return;
    }

    const shouldExpandMessage = isNewMessage && hasValidMeasurements;
    const targetHeight = shouldExpandMessage
      ? Math.max((listHeight ?? 0) - (contentOffset ?? 0), 0)
      : 0;

    const duration = shouldExpandMessage
      ? animationConfig.expandDuration
      : isNewMessage
        ? animationConfig.newMessageDuration
        : animationConfig.contractDuration;

    const easing = isNewMessage
      ? Easing.out(Easing.exp)
      : Easing.in(Easing.exp);

    animatedMinHeight.value = withTiming(targetHeight, { duration, easing });
  }, [
    isNewMessage,
    listHeight,
    contentOffset,
    animatedMinHeight,
    initialListHeight,
    hasListHeightChanged,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    minHeight: animatedMinHeight.value,
  }));

  return {
    animatedStyle,
    hasInitialLayoutCompleted: initialListHeight !== null,
  };
};
