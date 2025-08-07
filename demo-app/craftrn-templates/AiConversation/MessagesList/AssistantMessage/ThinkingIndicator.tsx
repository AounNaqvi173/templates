import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { useEffect, useState } from 'react';
import { TextStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ThinkingIndicatorProps = {
  style?: TextStyle;
  isTyping: boolean;
  isNewMessage: boolean;
  delay?: number;
};

export const ThinkingIndicator = ({ 
  style, 
  isTyping,
  isNewMessage,
  delay = 400 
}: ThinkingIndicatorProps) => {
  const { styles } = useStyles(stylesheet);
  const [showThinking, setShowThinking] = useState(!isTyping);
  const [ellipsisCount, setEllipsisCount] = useState(0);

  useEffect(() => {
    if (isTyping && isNewMessage) {
      setShowThinking(false);
      const timer = setTimeout(() => {
        setShowThinking(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isTyping) {
      setShowThinking(true);
    }
  }, [isTyping, isNewMessage, delay]);

  useEffect(() => {
    if (!showThinking) return;

    const ellipsisTimer = setInterval(() => {
      setEllipsisCount(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(ellipsisTimer);
  }, [showThinking]);

  if (!showThinking) return null;

  const ellipsis = '.'.repeat(ellipsisCount);

  return (
    <Text variant="body2" style={[style, styles.typingText]}>
      Thinking{ellipsis}
    </Text>
  );
};

const stylesheet = createStyleSheet(theme => ({
  typingText: {
    color: theme.colors.contentSecondary,
    fontStyle: 'italic',
  },
}));