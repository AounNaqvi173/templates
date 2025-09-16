import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { Attachment } from '@/tetrisly-icons/Attachment';
import { Paperplane } from '@/tetrisly-icons/Paperplane';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

const BUTTON_SIZE = 36;
const TEXT_INPUT_HEIGHT = 36;
const SEND_BUTTON_ANIMATION_DURATION = 250;

export const MessageComposer = () => {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const { theme } = useUnistyles();
  const buttonTranslateDistance = theme.spacing.large * 2;

  const inputAnimatedStyle = useAnimatedStyle(() => {
    const marginRight =
      inputValue === '' ? 0 : BUTTON_SIZE + theme.spacing.small;
    return {
      marginRight: withTiming(marginRight, {
        duration: SEND_BUTTON_ANIMATION_DURATION,
      }),
    };
  });

  const sendButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateX = inputValue === '' ? 0 : -buttonTranslateDistance;
    const opacity = inputValue === '' ? 0 : 1;
    return {
      transform: [
        {
          translateX: withTiming(translateX, {
            duration: SEND_BUTTON_ANIMATION_DURATION,
          }),
        },
      ],
      opacity: withTiming(opacity, {
        duration: SEND_BUTTON_ANIMATION_DURATION,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <ButtonRound
        onPress={() => null}
        renderContent={({ iconSize }) => (
          <Attachment color={theme.colors.contentPrimary} size={iconSize} />
        )}
        intent="primary"
      />
      <Animated.View
        style={[styles.textInputAnimatedContainer, inputAnimatedStyle]}
      >
        <TextInput
          ref={inputRef}
          placeholder="Type a message"
          placeholderTextColor={theme.colors.contentTertiary}
          value={inputValue}
          onChangeText={setInputValue}
          returnKeyType="send"
          autoCorrect={false}
          autoComplete="off"
          style={styles.textInput}
        />
      </Animated.View>
      <Animated.View
        style={[styles.buttonAnimatedContainer, sendButtonAnimatedStyle]}
      >
        <Pressable onPress={() => null}>
          {({ pressed }) => (
            <View style={styles.button({ pressed })}>
              <Paperplane color={theme.colors.white} />
            </View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderPrimary,
    paddingTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: Math.max(
      UnistylesRuntime.insets.bottom,
      theme.spacing.medium,
    ),
    flexDirection: 'row',
    gap: theme.spacing.small,
    position: 'relative',
  },
  textInputAnimatedContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.small,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.borderRadius.medium,
    height: TEXT_INPUT_HEIGHT,
    shadowColor: theme.colors.contentPrimary,
  },
  textInput: {
    flexGrow: 1,
    padding: theme.spacing.xsmall,
    color: theme.colors.contentPrimary,
    ...theme.textVariants.body2,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
    height: TEXT_INPUT_HEIGHT,
  },
  buttonAnimatedContainer: {
    position: 'absolute',
    top: theme.spacing.medium,
    right: -theme.spacing.large,
  },
  button: ({ pressed }) => ({
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: pressed
      ? theme.colors.accentSecondary
      : theme.colors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
  }),
}));
