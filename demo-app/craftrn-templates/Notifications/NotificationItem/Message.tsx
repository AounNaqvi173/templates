import { Text } from '@/craftrn-ui/components/Text';
import { Paperplane } from '@/tetrisly-icons/Paperplane';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const BUTTON_SIZE = 36;

export const Message = ({
  message,
  onPressReply,
}: {
  message: string;
  onPressReply?: () => void;
}) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.container}>
      <Text variant="body3">{message}</Text>
      {onPressReply && (
        <View style={styles.replyContainer}>
          <TextInput
            placeholder="Type your reply..."
            placeholderTextColor={theme.colors.contentTertiary}
            selectionColor={theme.colors.interactiveSecondaryContent}
            style={styles.textInput}
          />
          <Pressable onPress={onPressReply}>
            {({ pressed }) => (
              <View style={styles.sendButton(pressed)}>
                <Paperplane color={theme.colors.interactivePrimaryContent} />
              </View>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.backgroundNeutral,
    borderWidth: 1,
    borderColor: theme.colors.borderNeutral,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.small,
    overflow: 'hidden',
    gap: theme.spacing.small,
  },
  replyContainer: {
    backgroundColor: theme.colors.backgroundElevated,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xsmall,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendButton: (pressed: boolean) => ({
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.medium,
    backgroundColor: pressed
      ? theme.colors.interactivePrimaryPress
      : theme.colors.interactivePrimary,
  }),
  textInput: {
    flexGrow: 1,
    padding: 0,
    color: theme.colors.contentPrimary,
    height: '100%',
    paddingHorizontal: theme.spacing.small,
    ...theme.textVariants.body2,
    lineHeight: 0,
  },
}));
