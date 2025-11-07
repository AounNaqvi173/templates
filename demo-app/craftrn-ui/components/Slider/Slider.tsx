import React, { useCallback, useMemo, useState } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { type Theme } from '../../themes/config';

const createSliderTokens = (theme: Theme) => {
  return {
    size: {
      knob: 20,
      sliderHeight: 4,
    },
    colors: {
      track: theme.colors.borderNeutralSecondary,
      fill: theme.colors.interactiveSecondaryContent,
      knob: theme.colors.interactiveSecondaryContent,
    },
    borderRadius: {
      track: theme.borderRadius.full,
      fill: theme.borderRadius.full,
      knob: theme.borderRadius.full,
    },
    animation: {
      scale: {
        activeKnobScale: 1.2,
        spring: {
          mass: 0.2,
          damping: 15,
          stiffness: 300,
        },
        timing: {
          duration: 100,
          easing: Easing.out(Easing.cubic),
        },
      },
      position: {
        spring: {
          mass: 0.05,
          damping: 15,
          stiffness: 500,
        },
      },
    },
  };
};

/**
 * Props for the Slider component.
 */
export type Props = {
  /**
   * Minimum value of the slider.
   * @default 0
   */
  min: number;
  /**
   * Maximum value of the slider.
   * @default 100
   */
  max: number;
  /**
   * Initial value of the slider.
   * @default min
   */
  initialValue?: number;
  /**
   * Width of the slider.
   * @default 300
   */
  width?: number;
  /**
   * Callback function triggered when the slider's value changes.
   */
  onValueChange: (value: number) => void;
  /**
   * Accessibility label for the slider.
   */
  ariaLabel?: string;
  /**
   * Accessibility hint for the slider.
   */
  accessibilityHint?: string;
  /**
   * Step value for adjustments.
   * @default 1
   */
  step?: number;
  /**
   * Step value for accessibility adjustments.
   * @default step
   */
  accessibilityStep?: number;
};

export const Slider = ({
  min,
  max,
  width = 300,
  initialValue = min,
  onValueChange,
  ariaLabel,
  accessibilityHint = 'Increase or decrease the value',
  step = 1,
  accessibilityStep = step,
}: Props) => {
  const { theme } = useUnistyles();
  const sliderTokens = useMemo(() => createSliderTokens(theme), [theme]);

  const sliderWidth = width - sliderTokens.size.knob;
  const [accessibilityValue, setAccessibilityValue] = useState(initialValue);

  const prevPosition = useSharedValue(0);
  const knobScale = useSharedValue(1);
  const isDragging = useSharedValue(false);

  const getPositionFromValue = (value: number) => {
    'worklet';
    return ((value - min) / (max - min)) * sliderWidth;
  };

  const position = useSharedValue(
    initialValue !== undefined ? getPositionFromValue(initialValue) : 0,
  );

  const snapToStep = useCallback(
    (value: number) => {
      'worklet';
      const steppedValue = Math.round((value - min) / step) * step + min;
      return Math.min(Math.max(min, steppedValue), max);
    },
    [min, max, step],
  );

  const getSliderValue = useCallback(
    (pos: number) => {
      'worklet';
      const rawValue = (pos / sliderWidth) * (max - min) + min;
      return snapToStep(rawValue);
    },
    [max, min, sliderWidth, snapToStep],
  );

  const notifyValueChange = useCallback(
    (shouldUpdate = true) => {
      'worklet';
      if (!shouldUpdate) return;

      const value = getSliderValue(position.value);
      runOnJS(onValueChange)(value);
      runOnJS(setAccessibilityValue)(value);
    },
    [getSliderValue, onValueChange, position],
  );

  useAnimatedReaction(
    () => {
      return {
        pos: position.value,
        dragging: isDragging.value,
      };
    },
    (current, previous) => {
      if (current.dragging && current.pos !== previous?.pos) {
        const value = getSliderValue(current.pos);
        runOnJS(onValueChange)(value);
      }
    },
    [isDragging, position, getSliderValue, onValueChange],
  );

  const adjustValue = useCallback(
    (action: 'increment' | 'decrement') => {
      'worklet';
      const currentValue = getSliderValue(position.value);
      const newValue =
        action === 'increment'
          ? Math.min(max, currentValue + accessibilityStep)
          : Math.max(min, currentValue - accessibilityStep);
      const newPosition = getPositionFromValue(newValue);
      position.value = withSpring(
        newPosition,
        sliderTokens.animation.position.spring,
      );

      runOnJS(AccessibilityInfo.announceForAccessibility)(`${newValue}`);
      runOnJS(onValueChange)(newValue);
      runOnJS(setAccessibilityValue)(newValue);
    },
    [
      getSliderValue,
      position,
      max,
      accessibilityStep,
      min,
      getPositionFromValue,
      onValueChange,
      sliderTokens.animation.position.spring,
    ],
  );

  const handleAccessibilityAction = useCallback(
    (event: any) => {
      switch (event.nativeEvent.actionName) {
        case 'increment':
          adjustValue('increment');
          break;
        case 'decrement':
          adjustValue('decrement');
          break;
      }
    },
    [adjustValue],
  );

  const gesture = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      'worklet';
      prevPosition.value = position.value;
      isDragging.value = true;
      knobScale.value = withTiming(
        sliderTokens.animation.scale.activeKnobScale,
        sliderTokens.animation.scale.timing,
      );
    })
    .onUpdate(e => {
      'worklet';
      const newPosition = prevPosition.value + e.translationX;
      position.value = Math.max(0, Math.min(newPosition, sliderWidth));
    })
    .onFinalize(() => {
      'worklet';
      isDragging.value = false;
      const rawValue = (position.value / sliderWidth) * (max - min) + min;
      const snappedValue = snapToStep(rawValue);
      const finalPosition = getPositionFromValue(snappedValue);

      position.value = withSpring(
        finalPosition,
        sliderTokens.animation.position.spring,
      );
      knobScale.value = withTiming(1, sliderTokens.animation.scale.timing);
      notifyValueChange();
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value - sliderTokens.size.knob / 2 },
      { scale: knobScale.value },
    ],
    backgroundColor: sliderTokens.colors.knob,
  }));

  const fillStyle = useAnimatedStyle(() => ({
    left: 0,
    width: position.value,
    backgroundColor: sliderTokens.colors.fill,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.slider(sliderWidth)}>
        <Animated.View style={[styles.fill, fillStyle]} />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.knob, knobStyle]}
            hitSlop={4}
            accessible={true}
            role="slider"
            aria-label={ariaLabel}
            accessibilityHint={accessibilityHint}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={accessibilityValue}
            aria-valuetext={`${accessibilityValue}`}
            accessibilityActions={[
              {
                name: 'increment',
                label: `Increase value by ${accessibilityStep}`,
              },
              {
                name: 'decrement',
                label: `Decrease value by ${accessibilityStep}`,
              },
            ]}
            onAccessibilityAction={handleAccessibilityAction}
            importantForAccessibility="yes"
          />
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => {
  const sliderTokens = createSliderTokens(theme);

  return {
    container: {
      minHeight: sliderTokens.size.sliderHeight + sliderTokens.size.knob,
      paddingTop: sliderTokens.size.knob / 2,
    },
    slider: (width: number) => ({
      width,
      height: sliderTokens.size.sliderHeight,
      backgroundColor: sliderTokens.colors.track,
      borderRadius: sliderTokens.borderRadius.track,
    }),
    fill: {
      height: sliderTokens.size.sliderHeight,
      borderRadius: sliderTokens.borderRadius.fill,
      position: 'absolute' as const,
    },
    knob: {
      width: sliderTokens.size.knob,
      height: sliderTokens.size.knob,
      borderRadius: sliderTokens.borderRadius.knob,
      top: -(sliderTokens.size.knob / 2 - sliderTokens.size.sliderHeight / 2),
    },
  };
});
