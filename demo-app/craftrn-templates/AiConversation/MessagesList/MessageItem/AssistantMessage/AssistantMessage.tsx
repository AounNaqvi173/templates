import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Message } from '../data/conversations';
import { MessageContent } from './MessageContent';
import { useMessageAnimation } from './useMessageAnimation';
import { useMessageLoading } from './useMessageLoading';

type AssistantMessageProps = {
  message: Message;
  isNewMessage: boolean;
  listHeight?: number;
  contentOffset?: number;
  onNewMessageComplete?: () => void;
};

export const AssistantMessage = ({
  message,
  isNewMessage,
  listHeight,
  contentOffset,
  onNewMessageComplete,
}: AssistantMessageProps) => {
  const { styles } = useStyles(stylesheet);

  const { isLoading } = useMessageLoading(isNewMessage);
  const { animatedStyle } = useMessageAnimation(isNewMessage, {
    listHeight,
    contentOffset,
  });

  return (
    <Animated.View
      style={[styles.messageContainer, animatedStyle]}
      entering={
        isNewMessage
          ? FadeInDown.duration(300).springify().damping(15).stiffness(200)
          : undefined
      }
    >
      <MessageContent
        message={message}
        isNewMessage={isNewMessage}
        isLoading={isLoading}
        onNewMessageComplete={onNewMessageComplete}
      />
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  messageContainer: {
    marginBottom: theme.spacing.large,
    paddingHorizontal: 0,
  },
}));
