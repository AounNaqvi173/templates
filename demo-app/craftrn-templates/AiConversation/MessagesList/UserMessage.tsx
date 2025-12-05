import { Text } from '@/craftrn-ui/components/Text/Text';
import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
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

const styles = StyleSheet.create(theme => ({
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
    backgroundColor: theme.colors.backgroundNeutral,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    borderBottomRightRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.borderNeutralSecondary,
  },
  userMessageText: {
    color: theme.colors.contentPrimary,
    lineHeight: 20,
  },
}));
