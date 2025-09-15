import { Avatar } from '@/craftrn-ui/components/Avatar';
import { Text } from '@/craftrn-ui/components/Text';
import { TimeClock } from '@/tetrisly-icons/TimeClock';
import React from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Notification } from '../data/notifications';
import { formatRelativeDate } from '../utils/date';
import { AccessRequest } from './AccessRequest';
import { FileAttachment } from './FileAttachment';
import { Message } from './Message';

type NotificationItemProps = Notification & {
  index: number;
};

const mapTypeToText = {
  file: 'shared a file with you',
  message: 'sent you a private message',
  mention: 'mentioned you in',
  access: 'requested access to the channel',
  comment: 'added a comment on',
};

export const NotificationItem = ({
  index: _,
  ...item
}: NotificationItemProps) => {
  const { theme } = useUnistyles();

  const handlePress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            fallbackInitials={item.from.initials}
            fallbackColor={item.from.avatarColor}
            source={{ uri: item.from.avatar }}
          />
          <View style={styles.textContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.dateContainer}>
                <TimeClock size={12} color={theme.colors.contentSecondary} />
                <Text variant="body3" color="contentSecondary">
                  {formatRelativeDate(item.date)}
                </Text>
              </View>
              <View>
                <Text>
                  <Text variant="body2" style={styles.boldText}>
                    {item.from.name}{' '}
                  </Text>
                  <Text variant="body2">{mapTypeToText[item.type]}</Text>
                  {item.where && (
                    <Text variant="body2" style={styles.boldText}>
                      {' '}
                      {item.where}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
            {item.type === 'file' && (
              <FileAttachment {...item.details} onPressDownload={() => null} />
            )}
            {item.type === 'access' && (
              <AccessRequest
                onPressDeny={() => null}
                onPressConfirm={() => null}
              />
            )}
            {(item.type === 'mention' || item.type === 'message') && (
              <Message {...item.details} onPressReply={() => null} />
            )}
            {item.type === 'comment' && <Message {...item.details} />}
          </View>
        </View>
      </View>
      <View
        style={[styles.unreadIndicator, { opacity: item.unread ? 1 : 0 }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.large,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.small,
  },
  contentContainer: {
    gap: theme.spacing.small,
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
    flex: 1,
  },
  textContainer: {
    gap: theme.spacing.medium,
    flex: 1,
  },
  headerContainer: {
    gap: theme.spacing.xsmall,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xsmall,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.small,
    backgroundColor: theme.colors.informativePrimary,
  },
  boldText: {
    fontWeight: 'bold',
  },
}));
