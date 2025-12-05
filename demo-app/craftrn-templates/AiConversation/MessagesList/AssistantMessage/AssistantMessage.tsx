import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { Message } from '../../data/conversations';
import { MessageContent } from './MessageContent';
import { useMessageAnimation } from './useMessageAnimation';
import { useMessageLoading } from './useMessageLoading';

type AssistantMessageProps = {
  message: Message;
  isNewMessage: boolean;
  availableSpace?: number;
  onNewMessageComplete?: () => void;
};

export const AssistantMessage = ({
  message,
  isNewMessage,
  availableSpace,
  onNewMessageComplete,
}: AssistantMessageProps) => {
  const { isLoading } = useMessageLoading(isNewMessage);
  const { animatedStyle } = useMessageAnimation(isNewMessage, availableSpace);

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

const styles = StyleSheet.create(theme => ({
  messageContainer: {
    marginBottom: theme.spacing.large,
    paddingHorizontal: 0,
  },
}));
