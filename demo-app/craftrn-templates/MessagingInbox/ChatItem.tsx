import { Avatar, avatarConfig } from '@/craftrn-ui/components/Avatar';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ArchiveBottomSheet } from './ArchiveBottomSheet';
import { InboxItem } from './data/inbox';
import { currentUser } from './data/users';
import { SwipeableRow } from './SwipableRow';
import { formatRelativeDate } from './utils/date';

export const HEIGHT = 80;

type ChatItemProps = InboxItem & {
  onPress: () => void;
  divider: boolean;
  onShowMoreBottomSheet: (inboxId: string) => void;
};

export const ChatItem: ComponentType<ChatItemProps> = ({
  onPress,
  divider,
  onShowMoreBottomSheet,
  ...item
}) => {
  const [archiveBottomSheetVisible, setArchiveBottomSheetVisible] =
    useState(false);
  const { styles } = useStyles(stylesheet);

  const user = useMemo(
    () =>
      item.participants.filter(
        participant => participant.id !== currentUser.id,
      )[0],
    [item.participants],
  );

  const handlePressMore = useCallback(() => {
    onShowMoreBottomSheet(item.id);
  }, [onShowMoreBottomSheet, item.id]);

  const handlePressArchive = useCallback(() => {
    setArchiveBottomSheetVisible(true);
  }, []);

  return (
    <>
      <SwipeableRow
        onPressMore={handlePressMore}
        onPressArchive={handlePressArchive}
      >
        <Pressable onPress={onPress} onLongPress={handlePressMore}>
          {({ pressed }) => (
            <View style={styles.rowContainer(pressed)}>
              <Avatar
                fallbackInitials={user.initials}
                fallbackColor={user.avatarColor}
                source={{ uri: user.avatarUri }}
                showOnlineIndicator={!!user.isOnline}
              />
              <View style={styles.rowContent}>
                <View style={styles.rowContentDetails}>
                  <Text variant="body2" style={styles.rowContentDetailsName}>
                    {user.name}
                  </Text>
                  <Text variant="body3" color="contentQuaternary">
                    {formatRelativeDate(item.lastMessage.date)}
                  </Text>
                </View>
                <View style={styles.messageContent}>
                  <Text
                    variant="body2"
                    color="contentTertiary"
                    numberOfLines={2}
                    style={styles.messageText}
                  >
                    {item.lastMessage.content[0]}
                  </Text>
                  {item.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text variant="body3" style={styles.unreadText}>
                        {item.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </Pressable>
        {divider && <View style={styles.divider} />}
      </SwipeableRow>

      <ArchiveBottomSheet
        visible={archiveBottomSheetVisible}
        onRequestClose={() => setArchiveBottomSheetVisible(false)}
        onPressCancel={() => setArchiveBottomSheetVisible(false)}
        onPressConfirm={() => setArchiveBottomSheetVisible(false)}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  rowContainer: (pressed: boolean) => ({
    gap: theme.spacing.medium,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    height: HEIGHT,
    backgroundColor: pressed ? theme.colors.surfaceSecondary : undefined,
  }),
  rowContent: {
    gap: theme.spacing.xsmall,
    flex: 1,
  },
  rowContentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rowContentDetailsName: {
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    flexDirection: 'row',
  },
  messageText: {
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: theme.colors.accentPrimary,
    borderRadius: theme.borderRadius.full,
    width: 20,
    height: 20,
    marginLeft: theme.spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xsmall,
  },
  unreadText: {
    color: theme.colors.white,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderPrimary,
    marginLeft:
      theme.spacing.large +
      avatarConfig.medium.avatarSize +
      theme.spacing.medium,
  },
}));
