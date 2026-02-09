import { Avatar } from '@/craftrn-ui/components/Avatar/Avatar';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { useMemo } from 'react';
import { Keyboard, Platform, Pressable, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { BackToBottomButton } from './BackToBottomButton';
import { useComposerHeight } from './ComposerHeightContext';
import { Message } from './data/discussions';
import { User } from './data/users';
import { formatTime } from './utils/date';

type MessagesListProps = {
  participants: User[];
  messages: Message[];
  onShowMoreBottomSheet: () => void;
};

export const MessagesList = ({
  participants,
  messages,
  onShowMoreBottomSheet,
}: MessagesListProps) => {
  const scrollRef = useAnimatedRef<Animated.FlatList<Message>>();
  const scrollPosition = useSharedValue(0);
  const { progress } = useReanimatedKeyboardAnimation();
  const { theme } = useUnistyles();
  const { composerHeight } = useComposerHeight();

  const keyboardPadding =
    Platform.OS === 'ios'
      ? composerHeight - UnistylesRuntime.insets.bottom
      : composerHeight + UnistylesRuntime.insets.bottom - theme.spacing.medium;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
  });

  const flatListAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: progress.value * keyboardPadding,
    };
  });
  const backToBottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -progress.value * keyboardPadding }],
    };
  });

  const messagesReversed = useMemo(() => [...messages].reverse(), [messages]);

  const participantsById = useMemo(
    () =>
      Object.fromEntries(
        participants.map(participant => [participant.id, participant]),
      ),
    [participants],
  );

  return (
    <>
      <Animated.FlatList<Message>
        ref={scrollRef}
        style={[styles.flatList, flatListAnimatedStyle]}
        data={messagesReversed}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }: { item: Message }) => {
          const sender = participantsById[item.senderId];
          return (
            <Pressable
              onPress={Keyboard.dismiss}
              onLongPress={onShowMoreBottomSheet}
            >
              <View style={styles.itemContainer}>
                <Avatar
                  fallbackInitials={sender.initials}
                  fallbackColor={sender.avatarColor}
                  source={{ uri: sender.avatarUri }}
                />
                <View style={styles.itemContent}>
                  <View style={styles.itemContentHeading}>
                    <Text
                      variant="body2"
                      style={styles.itemContentHeadingSender}
                    >
                      {sender.name}
                    </Text>
                    <Text variant="body3" color="contentTertiary">
                      {formatTime(item.date)}
                    </Text>
                  </View>
                  <View style={styles.itemContentMessage}>
                    {item.content.map(messageContent => (
                      <Text variant="body2" key={messageContent}>
                        {messageContent}
                      </Text>
                    ))}
                  </View>
                  {item.reactions.length > 0 && (
                    <View style={styles.reactionsContainer}>
                      {item.reactions.map(reaction => (
                        <Pressable key={reaction} onPress={() => null}>
                          {({ pressed: pressedReaction }) => (
                            <View
                              style={styles.reactionItem({
                                pressed: pressedReaction,
                              })}
                            >
                              <Text variant="body3">{reaction}</Text>
                            </View>
                          )}
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
        onScroll={scrollHandler}
        inverted
      />
      <Animated.View style={backToBottomAnimatedStyle}>
        <BackToBottomButton
          scrollPosition={scrollPosition}
          scrollRef={scrollRef}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  flatList: {
    flex: 1,
    position: 'relative',
  },
  itemContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    flexDirection: 'row',
    gap: theme.spacing.medium,
  },
  itemContent: {
    flex: 1,
    gap: theme.spacing.xsmall,
  },
  itemContentHeading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xsmall,
    alignItems: 'center',
  },
  itemContentHeadingSender: {
    fontWeight: 'bold',
  },
  itemContentMessage: {
    gap: theme.spacing.small,
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xsmall,
    marginTop: theme.spacing.xsmall,
  },
  reactionItem: ({ pressed }) => ({
    backgroundColor: pressed
      ? theme.colors.interactiveNeutralPress
      : theme.colors.interactiveNeutral,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xsmall,
    borderRadius: theme.borderRadius.full,
    borderColor: theme.colors.borderNeutral,
  }),
}));
