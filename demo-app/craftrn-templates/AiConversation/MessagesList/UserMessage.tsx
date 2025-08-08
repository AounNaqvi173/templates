import { Text } from '@/craftrn-ui/components/Text/Text';
import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Message } from '../data/conversations';

type UserMessageProps = {
  message: Message;
  isNewMessage: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const UserMessage = ({
  message,
  isNewMessage,
  onLayout,
}: UserMessageProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Animated.View
      style={styles.userMessageContainer}
      entering={isNewMessage ? FadeInDown.duration(500) : undefined}
      onLayout={onLayout}
    >
      <View style={styles.userMessageContent}>
        <View style={styles.userBubble}>
          <Text variant="body2" style={styles.userMessageText} selectable>
            {message.content}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  userMessageContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xlarge,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  userMessageContent: {
    flex: 1,
    maxWidth: '80%',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: theme.colors.accentPrimary,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    borderBottomRightRadius: theme.borderRadius.small,
    shadowColor: theme.colors.contentPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessageText: {
    color: theme.colors.white,
    lineHeight: 20,
  },
}));
