import React, { useEffect, useMemo } from 'react';
import { AccessibilityProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';
import { PressableScale, type AnimationConfig } from '../PressableScale';

const createRadioTokens = (theme: typeof lightTheme | typeof darkTheme) => {
  return {
    size: {
      container: 24,
      dot: 8,
    },
    colors: {
      background: {
        unchecked: theme.colors.backgroundNeutral,
        checked: theme.colors.interactiveSecondaryContent,
      },
      dot: theme.colors.baseLight,
    },
    animation: {
      duration: 200,
    },
  };
};

/**
 * Props for the Radio component.
 */
export type Props = {
  /**
   * Whether the radio button is checked.
   */
  checked: boolean;
  /**
   * Whether the radio button is disabled.
   */
  disabled?: boolean;
  /**
   * Callback when the radio is pressed.
   */
  onPress?: (isChecked: boolean) => void;
  /**
   * Animation configuration for press interactions
   * @default { scaleIn: 1.1, durationIn: 150, durationOut: 150 }
   */
  animationConfig?: AnimationConfig;
};

type RadioProps = Props & AccessibilityProps;

export const Radio = ({
  checked = false,
  disabled = false,
  onPress,
  animationConfig,
  ...accessibilityProps
}: RadioProps) => {
  const { theme } = useUnistyles();

  const radioTokens = useMemo(() => createRadioTokens(theme), [theme]);

  const appearance = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    appearance.value = withTiming(checked ? 1 : 0, {
      duration: radioTokens.animation.duration,
    });
  }, [checked, appearance, radioTokens.animation]);

  const checkedAnimatedStyle = useAnimatedStyle(() => ({
    opacity: appearance.value,
  }));

  const dotAnimatedStyle = useAnimatedStyle(() => {
    const size =
      appearance.value * (radioTokens.size.dot - radioTokens.size.container) +
      radioTokens.size.container;

    return {
      width: size,
      height: size,
    };
  });

  return (
    <PressableScale
      onPress={() => onPress?.(!checked)}
      accessible
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      animationConfig={
        animationConfig ?? {
          scaleIn: 1.1,
        }
      }
      {...accessibilityProps}
    >
      <Animated.View
        style={[styles.container, disabled && styles.containerDisabled]}
      >
        <Animated.View style={[styles.checked, checkedAnimatedStyle]}>
          <Animated.View style={[styles.dot, dotAnimatedStyle]} />
        </Animated.View>
      </Animated.View>
    </PressableScale>
  );
};

const styles = StyleSheet.create(theme => {
  const radioTokens = createRadioTokens(theme);

  return {
    container: {
      borderRadius: theme.borderRadius.full,
      backgroundColor: radioTokens.colors.background.unchecked,
      width: radioTokens.size.container,
      height: radioTokens.size.container,
      overflow: 'hidden',
    },
    containerDisabled: {
      opacity: 0.5,
    },
    checked: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: radioTokens.colors.background.checked,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      borderRadius: theme.borderRadius.full,
      backgroundColor: radioTokens.colors.dot,
      width: radioTokens.size.dot,
      height: radioTokens.size.dot,
    },
  };
});
