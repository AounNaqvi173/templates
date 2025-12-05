import React from 'react';
import { LayoutChangeEvent, Platform } from 'react-native';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { Message } from '../data/conversations';
import { AssistantMessage } from './AssistantMessage';
import { UserMessage } from './UserMessage';

type MessageItemProps = {
  message: Message;
  index: number;
  messagesReversed: Message[];
  isNewMessage: boolean;
  listHeight: number;
  userMessageHeight: number;
  composerHeight: number;
  onUserMessageLayout?: (event: LayoutChangeEvent) => void;
};

export const MessageItem = ({
  message,
  index,
  messagesReversed,
  isNewMessage,
  listHeight,
  userMessageHeight,
  composerHeight,
  onUserMessageLayout,
}: MessageItemProps) => {
  const { theme } = useUnistyles();

  const isUser = message.role === 'user';
  const latestUserIndex = messagesReversed.findIndex(
    msg => msg.role === 'user',
  );
  const isLatestUserMessage = isUser && index === latestUserIndex;

  const contentOffset =
    userMessageHeight +
    theme.spacing.xlarge +
    theme.spacing.large +
    theme.spacing.medium;

  const topToComposerSpacing = Math.max(
    listHeight -
      composerHeight +
      (Platform.OS === 'ios' ? UnistylesRuntime.insets.bottom : 0) -
      contentOffset,
    0,
  );

  if (isUser) {
    return (
      <UserMessage
        message={message}
        isNewMessage={isNewMessage}
        onLayout={isLatestUserMessage ? onUserMessageLayout : undefined}
      />
    );
  }

  return (
    <AssistantMessage
      message={message}
      isNewMessage={isNewMessage}
      availableSpace={topToComposerSpacing}
    />
  );
};
