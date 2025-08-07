import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useStyles } from 'react-native-unistyles';
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
  onUserMessageLayout?: (event: LayoutChangeEvent) => void;
};

export const MessageItem = ({
  message,
  index,
  messagesReversed,
  isNewMessage,
  listHeight,
  userMessageHeight,
  onUserMessageLayout,
}: MessageItemProps) => {
  const { theme } = useStyles();

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
      listHeight={listHeight}
      contentOffset={contentOffset}
    />
  );
};
