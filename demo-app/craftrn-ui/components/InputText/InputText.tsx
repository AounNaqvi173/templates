import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';
import { Text } from '../Text';

type Size = 'small' | 'medium' | 'large';

const createInputTextTokens = (theme: typeof lightTheme | typeof darkTheme) => {
  return {
    size: {
      small: {
        height: 40,
      },
      medium: {
        height: 48,
      },
      large: {
        height: 56,
      },
    },
    spacing: {
      small: {
        paddingHorizontal: theme.spacing.small,
        paddingVertical: theme.spacing.xsmall,
        accessoryMargin: theme.spacing.xsmall,
        labelMarginTop: 0,
      },
      medium: {
        paddingHorizontal: theme.spacing.small,
        paddingVertical: theme.spacing.xsmall,
        accessoryMargin: theme.spacing.xsmall,
        labelMarginTop: theme.spacing.large,
      },
      large: {
        paddingHorizontal: theme.spacing.small,
        paddingVertical: theme.spacing.xsmall,
        accessoryMargin: theme.spacing.xsmall,
        labelMarginTop: theme.spacing.large,
      },
    },
    colors: {
      border: {
        normal: theme.colors.borderNeutralSecondary,
        active: theme.colors.interactiveSecondaryContent,
        error: theme.colors.sentimentNegative,
      },
      background: theme.colors.backgroundElevated,
      text: theme.colors.contentPrimary,
      label: theme.colors.contentTertiary,
      placeholder: theme.colors.contentTertiary,
      selection: theme.colors.interactiveSecondaryContent,
    },
    borderRadius: {
      small: theme.borderRadius.medium,
      medium: theme.borderRadius.medium,
      large: theme.borderRadius.medium,
    },
    animation: {
      label: {
        duration: 200,
        easing: Easing.inOut(Easing.cubic),
      },
    },
    typography: {
      small: theme.textVariants.body3,
      medium: theme.textVariants.body2,
      large: theme.textVariants.body1,
    },
  };
};

/**
 * Base props for the InputText component.
 */
type BaseProps = {
  /**
   * The size of the input.
   * @default 'medium'
   */
  size?: Size;
  /**
   * Callback function triggered when the input is pressed.
   */
  onPress?: () => void;
  /**
   * Left accessory element. Will be placed before the input.
   */
  leftAccessory?: React.ReactElement;
  /**
   * Right accessory element. Will be placed after the input.
   */
  rightAccessory?: React.ReactElement;
  /**
   * Error message to display below the input.
   */
  error?: string;
};

/**
 * Props for InputText with label (placeholder will be ignored).
 */
type PropsWithLabel = BaseProps & {
  /**
   * The label to display above the input.
   */
  label?: string;
  placeholder?: never;
};

/**
 * Props for InputText with placeholder (no label).
 */
type PropsWithPlaceholder = BaseProps & {
  label?: never;
  /**
   * Placeholder text to display when input is empty.
   */
  placeholder?: string;
};

/**
 * Props for the InputText component.
 * Either use label OR placeholder, but not both.
 */
export type Props = PropsWithLabel | PropsWithPlaceholder;

export const InputText = forwardRef<TextInput, Props & TextInputProps>(
  function InputText(
    {
      size = 'medium',
      label,
      onPress,
      value,
      leftAccessory,
      rightAccessory,
      onFocus,
      error,
      style,
      editable = true,
      readOnly = false,
      ...restProps
    },
    ref,
  ) {
    const { theme } = useUnistyles();
    const inputTextTokens = useMemo(
      () => createInputTextTokens(theme),
      [theme],
    );
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const reduceMotion = useReducedMotion();
    const isActive = isFocused || !!value;
    const isActiveShared = useSharedValue(isActive);

    useEffect(() => {
      isActiveShared.value = isActive;
    }, [isActive, isActiveShared]);

    const labelAnimatedStyle = useAnimatedStyle(() => {
      const animationConfig = {
        easing: inputTextTokens.animation.label.easing,
        duration: reduceMotion ? 0 : inputTextTokens.animation.label.duration,
      };

      return {
        transform: [
          {
            translateY: withTiming(
              isActiveShared.value ? -12 : 0,
              animationConfig,
            ),
          },
          {
            scale: withTiming(isActiveShared.value ? 0.85 : 1, animationConfig),
          },
        ],
      };
    }, [reduceMotion, inputTextTokens.animation.label]);

    const handlePress = useCallback(() => {
      inputRef.current?.focus();
      onPress?.();
    }, [inputRef, onPress]);

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    return (
      <View>
        <Pressable onPress={handlePress}>
          {({ pressed }) => (
            <View
              style={[
                styles.container({
                  active: pressed || isFocused,
                  error: !!error,
                  size,
                }),
              ]}
            >
              {leftAccessory && (
                <View style={styles.accessory({ size })}>{leftAccessory}</View>
              )}
              <View style={styles.textInputContainer}>
                {label && (
                  <Animated.Text
                    style={[styles.label({ size }), labelAnimatedStyle]}
                  >
                    {label}
                  </Animated.Text>
                )}
                <TextInput
                  {...restProps}
                  ref={ref ?? inputRef}
                  style={[styles.textInput({ size, hasLabel: !!label }), style]}
                  value={value}
                  onFocus={handleFocus}
                  onBlur={() => setIsFocused(false)}
                  placeholderTextColor={inputTextTokens.colors.placeholder}
                  selectionColor={inputTextTokens.colors.selection}
                  pointerEvents={!editable || readOnly ? 'none' : undefined}
                  editable={editable}
                  readOnly={readOnly}
                  accessibilityLabel={`${value ?? ''} ${error ?? ''}`}
                />
              </View>
              {rightAccessory && (
                <View style={styles.accessory({ size })}>{rightAccessory}</View>
              )}
            </View>
          )}
        </Pressable>
        {error && (
          <Text variant="body3" color="sentimentNegative" style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create(theme => {
  const inputTextTokens = createInputTextTokens(theme);

  return {
    container: ({
      active,
      error,
      size,
    }: {
      active: boolean;
      error: boolean;
      size: Size;
    }) => {
      const sizeTokens = inputTextTokens.spacing[size];
      const sizeConfig = inputTextTokens.size[size];
      return {
        borderRadius: inputTextTokens.borderRadius[size],
        borderWidth: 1,
        borderColor: active
          ? inputTextTokens.colors.border.active
          : error
            ? inputTextTokens.colors.border.error
            : inputTextTokens.colors.border.normal,
        backgroundColor: inputTextTokens.colors.background,
        paddingVertical: sizeTokens.paddingVertical,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        minHeight: sizeConfig.height,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
      };
    },
    textInputContainer: {
      flex: 1,
      position: 'relative',
    },
    label: ({ size }: { size: Size }) => {
      const sizeTokens = inputTextTokens.spacing[size];
      const sizeConfig = inputTextTokens.size[size];
      const typographyTokens = inputTextTokens.typography[size];
      return {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        color: inputTextTokens.colors.label,
        textAlign: 'left',
        transformOrigin: '0 50%',
        ...typographyTokens,
        lineHeight: sizeConfig.height - sizeTokens.paddingVertical * 2 - 2,
      };
    },
    textInput: ({ size, hasLabel }: { size: Size; hasLabel: boolean }) => {
      const sizeTokens = inputTextTokens.spacing[size];
      const typographyTokens = inputTextTokens.typography[size];
      return {
        flex: 1,
        paddingVertical: 0,
        paddingLeft: 0,
        minWidth: 0,
        color: inputTextTokens.colors.text,
        ...typographyTokens,
        lineHeight: Platform.OS === 'ios' ? 0 : typographyTokens.lineHeight,
        marginTop: hasLabel ? sizeTokens.labelMarginTop : 0,
      };
    },
    accessory: ({ size }: { size: Size }) => ({
      marginHorizontal: inputTextTokens.spacing[size].accessoryMargin,
    }),
    error: {
      marginTop: theme.spacing.xsmall,
    },
  };
});
