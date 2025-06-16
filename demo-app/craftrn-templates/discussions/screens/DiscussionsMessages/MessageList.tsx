import { Avatar } from '@/craftrn-ui/components/Avatar/Avatar';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Message } from '../../data/discussions';
import { User } from '../../data/users';
import { formatTime } from '../../utils/date';
import { BackToBottomButton } from './BackToBottomButton';

type MessagesListProps = {
  participants: User[];
  messages: Message[];
};

export const MessagesList = ({ participants, messages }: MessagesListProps) => {
  const { styles } = useStyles(stylesheet);
  const scrollRef = useAnimatedRef<Animated.FlatList<Message>>();
  const scrollPosition = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
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
        style={styles.flatList}
        contentContainerStyle={styles.flatListContentContainer}
        data={messagesReversed}
        renderItem={({ item }: { item: Message }) => {
          const sender = participantsById[item.senderId];
          return (
            <View style={styles.itemContainer}>
              <Avatar
                fallbackInitials={sender.initials}
                fallbackColor={sender.avatarColor}
                source={{ uri: sender.avatarUri }}
              />
              <View style={styles.itemContent}>
                <View style={styles.itemContentHeading}>
                  <Text variant="body2" style={styles.itemContentHeadingSender}>
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
              </View>
            </View>
          );
        }}
        onScroll={scrollHandler}
        inverted
      />
      <BackToBottomButton
        scrollPosition={scrollPosition}
        scrollRef={scrollRef}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  flatList: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.colors.backgroundPrimary,
  },
  flatListContentContainer: {
    paddingTop: theme.spacing.small,
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
}));
