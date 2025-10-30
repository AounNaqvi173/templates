import React, {
  forwardRef,
  useCallback,
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
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';

const createInputSearchTokens = (
  theme: typeof lightTheme | typeof darkTheme,
) => {
  return {
    size: {
      height: 48,
    },
    colors: {
      border: {
        normal: theme.colors.borderNeutralSecondary,
        active: theme.colors.interactiveSecondaryContent,
      },
      background: theme.colors.backgroundElevated,
      text: theme.colors.contentPrimary,
      placeholder: theme.colors.contentTertiary,
      selection: theme.colors.interactiveSecondaryContent,
    },
  };
};

/**
 * Props for the InputSearch component.
 * @see TextInputProps
 */
export type Props = {
  /**
   * Callback function triggered when the input is pressed.
   */
  onPress?: () => void;
  /**
   * Left accessory element. Will be placed before the input.
   */
  leftAccessory?: React.ReactNode;
  /**
   * Right accessory element. Will be placed after the input.
   */
  rightAccessory?: React.ReactNode;
};

export const InputSearch = forwardRef<TextInput, Props & TextInputProps>(
  function InputSearch(
    {
      onPress,
      onFocus,
      onBlur,
      value,
      leftAccessory,
      rightAccessory,
      ...props
    },
    ref,
  ) {
    const { theme } = useUnistyles();
    const inputSearchTokens = useMemo(
      () => createInputSearchTokens(theme),
      [theme],
    );
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || !!value;
    const isReadOnly = !props.editable && !!props.readOnly;
    const inputRef = useRef<TextInput>(null);

    const handlePress = useCallback(() => {
      inputRef.current?.focus();
      onPress?.();
    }, [onPress]);

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <Pressable
        onPress={handlePress}
        style={styles.container}
        accessible={!!onPress}
        role={!!onPress ? 'button' : undefined}
      >
        <View
          style={styles.inputContainer({
            active: isActive,
          })}
        >
          {leftAccessory}
          <TextInput
            style={styles.textInput({ readOnly: isReadOnly })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            ref={ref}
            placeholderTextColor={inputSearchTokens.colors.placeholder}
            selectionColor={inputSearchTokens.colors.selection}
            textAlignVertical="center"
            role="searchbox"
            {...props}
          />
          {rightAccessory}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create(theme => {
  const inputSearchTokens = createInputSearchTokens(theme);

  return {
    container: {
      width: '100%',
    },
    inputContainer: ({ active }: { active: boolean }) => ({
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: active
        ? inputSearchTokens.colors.border.active
        : inputSearchTokens.colors.border.normal,
      paddingHorizontal: theme.spacing.small,
      paddingVertical: theme.spacing.xsmall,
      height: inputSearchTokens.size.height,
      backgroundColor: inputSearchTokens.colors.background,
    }),
    textInput: ({ readOnly }: { readOnly: boolean }) => ({
      flexGrow: 1,
      padding: 0,
      marginHorizontal: theme.spacing.small,
      height: inputSearchTokens.size.height - 2,
      pointerEvents: readOnly ? 'none' : 'auto',
      color: inputSearchTokens.colors.text,
      lineHeight: Platform.OS === 'ios' ? 0 : undefined,
    }),
  };
});
