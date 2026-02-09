import React, { forwardRef } from 'react';
import { Platform, TextInput, TextInputProps, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const TEXT_INPUT_MIN_HEIGHT = 40;
const TEXT_INPUT_MAX_HEIGHT = 100;

type InputFieldProps = Pick<TextInputProps, 'value' | 'onChangeText'>;

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ value, onChangeText }, ref) => {
    const { theme } = useUnistyles();

    return (
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          placeholder="Chat with Claude..."
          placeholderTextColor={theme.colors.contentTertiary}
          selectionColor={theme.colors.contentAccentSecondary}
          value={value}
          onChangeText={onChangeText}
          multiline
          autoCorrect
          autoComplete="off"
          style={styles.textInput}
          scrollEnabled
        />
      </View>
    );
  },
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create(theme => ({
  inputContainer: {
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical:
      Platform.OS === 'ios' ? theme.spacing.small + 2 : theme.spacing.small,
  },
  textInput: {
    ...theme.textVariants.body1,
    color: theme.colors.contentPrimary,
    lineHeight: Platform.OS === 'ios' ? 20 : 22,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    minHeight: TEXT_INPUT_MIN_HEIGHT,
    maxHeight: TEXT_INPUT_MAX_HEIGHT,
    includeFontPadding: false,
  },
}));
