import React, { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Message } from '../data/conversations';
import { ActionButtons } from './ActionButtons';
import { FormattedText } from './FormattedText';
import { ThinkingIndicator } from './ThinkingIndicator';
import { TypewriterText } from './TypewriterText';

type MessageContentProps = {
  message: Message;
  isNewMessage: boolean;
  isLoading: boolean;
  onNewMessageComplete?: () => void;
};

export const MessageContent = ({
  message,
  isNewMessage,
  isLoading,
  onNewMessageComplete,
}: MessageContentProps) => {
  const { styles } = useStyles(stylesheet);
  const [isTypewritingComplete, setIsTypewritingComplete] = useState(false);

  const handleTypewritingComplete = () => {
    setIsTypewritingComplete(true);
    onNewMessageComplete?.();
  };

  // Show loading indicator for new messages
  if (isLoading) {
    return (
      <ThinkingIndicator
        style={styles.messageText}
        isTyping={isLoading}
        isNewMessage={isNewMessage}
      />
    );
  }

  // Show typewriter effect for new messages that aren't loading
  if (isNewMessage && !isTypewritingComplete) {
    return (
      <TypewriterText
        style={styles.messageText}
        onComplete={handleTypewritingComplete}
      >
        {message.content}
      </TypewriterText>
    );
  }

  // Show final formatted content with action buttons
  return (
    <View style={styles.messageContent}>
      <FormattedText style={styles.messageText}>
        {message.content}
      </FormattedText>
      <ActionButtons isVisible={isTypewritingComplete || !isNewMessage} />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  messageText: {
    color: theme.colors.contentPrimary,
    lineHeight: 24,
  },
  messageContent: {
    gap: theme.spacing.small,
  },
}));
