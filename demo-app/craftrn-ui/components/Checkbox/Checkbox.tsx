import React, { useEffect, useMemo } from 'react';
import { AccessibilityProps, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';
import { PressableScale, type AnimationConfig } from '../PressableScale';
import { CheckLarge } from './CheckLarge';

const createCheckboxTokens = (theme: typeof lightTheme | typeof darkTheme) => {
  return {
    size: {
      container: 24,
    },
    colors: {
      background: {
        unchecked: theme.colors.interactiveNeutral,
        checked: theme.colors.interactiveSecondaryContent,
      },
      icon: theme.colors.white,
    },
    animation: {
      duration: 200,
    },
  };
};

/**
 * Props for the Checkbox component.
 */
export type Props = {
  /**
   * Whether the checkbox is checked.
   * @default false
   */
  checked?: boolean;
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback when the checkbox is pressed.
   */
  onPress?: (isChecked: boolean) => void;
  /**
   * Animation configuration for press interactions
   * @default { scaleIn: 1.1, durationIn: 150, durationOut: 150 }
   */
  animationConfig?: AnimationConfig;
};

type CheckboxProps = Props & AccessibilityProps;

export const Checkbox = ({
  checked = false,
  disabled = false,
  onPress,
  animationConfig,
  ...accessibilityProps
}: CheckboxProps) => {
  const { theme } = useUnistyles();

  const checkboxTokens = useMemo(() => createCheckboxTokens(theme), [theme]);

  const appearance = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    appearance.value = withTiming(checked ? 1 : 0, {
      duration: checkboxTokens.animation.duration,
    });
  }, [checked, appearance, checkboxTokens.animation]);

  const checkedStyle = useAnimatedStyle(() => ({
    opacity: appearance.value,
  }));

  return (
    <PressableScale
      onPress={() => onPress?.(!checked)}
      accessible
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      animationConfig={
        animationConfig ?? {
          scaleIn: 1.1,
        }
      }
      {...accessibilityProps}
    >
      <View style={[styles.container, disabled && styles.containerDisabled]}>
        <Animated.View style={[styles.checked, checkedStyle]}>
          <CheckLarge color={checkboxTokens.colors.icon} />
        </Animated.View>
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create(theme => {
  const checkboxTokens = createCheckboxTokens(theme);

  return {
    container: {
      borderRadius: theme.borderRadius.small,
      backgroundColor: checkboxTokens.colors.background.unchecked,
      width: checkboxTokens.size.container,
      height: checkboxTokens.size.container,
      overflow: 'hidden',
    },
    checked: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: checkboxTokens.colors.background.checked,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerDisabled: {
      opacity: 0.5,
    },
  };
});
