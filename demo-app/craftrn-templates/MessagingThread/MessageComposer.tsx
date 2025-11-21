import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import type { Theme } from '@/craftrn-ui/themes/config';
import { Attachment } from '@/tetrisly-icons/Attachment';
import { Paperplane } from '@/tetrisly-icons/Paperplane';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';

const BUTTON_SIZE = 36;
const TEXT_INPUT_HEIGHT = 36;

const animConfig = {
  duration: 250,
};

export const getStickyOffset = (theme: Theme) =>
  Math.max(UnistylesRuntime.insets.bottom, theme.spacing.medium);

type MessageComposerProps = {
  onHeightChange?: (height: number) => void;
};

export const MessageComposer = ({ onHeightChange }: MessageComposerProps) => {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const { theme } = useUnistyles();
  const buttonTranslateDistance = theme.spacing.large * 2;

  const stickyOffset = getStickyOffset(theme);

  const inputAnimatedStyle = useAnimatedStyle(() => {
    const marginRight =
      inputValue === '' ? 0 : BUTTON_SIZE + theme.spacing.small;
    return {
      marginRight: withTiming(marginRight, {
        duration: animConfig.duration,
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
            duration: animConfig.duration,
          }),
        },
      ],
      opacity: withTiming(opacity, {
        duration: animConfig.duration,
      }),
    };
  });

  return (
    <KeyboardStickyView
      offset={{
        closed: 0,
        opened: stickyOffset,
      }}
    >
      <View
        style={styles.container}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          onHeightChange?.(height);
        }}
      >
        <ButtonRound
          onPress={() => null}
          renderContent={({ iconSize }) => (
            <Attachment color={theme.colors.contentPrimary} size={iconSize} />
          )}
          variant="neutral-secondary"
        />
        <Animated.View
          style={[styles.textInputAnimatedContainer, inputAnimatedStyle]}
        >
          <TextInput
            ref={inputRef}
            placeholder="Type a message"
            placeholderTextColor={theme.colors.contentTertiary}
            selectionColor={theme.colors.contentAccentSecondary}
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
                <Paperplane color={theme.colors.interactivePrimaryContent} />
              </View>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    borderTopWidth: 1,
    backgroundColor: theme.colors.backgroundScreen,
    borderTopColor: theme.colors.borderNeutral,
    paddingTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.medium + UnistylesRuntime.insets.bottom,
    flexDirection: 'row',
    gap: theme.spacing.small,
    position: 'relative',
  },
  textInputAnimatedContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.small,
    backgroundColor: theme.colors.backgroundElevated,
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
      ? theme.colors.interactivePrimaryPress
      : theme.colors.interactivePrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
  }),
}));
