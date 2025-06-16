import { Avatar } from '@/craftrn-ui/components/Avatar/Avatar';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Discussion } from '../../data/discussions';
import { currentUser } from '../../data/users';
import { formatRelativeDate } from '../../utils/date';
import { SwipeableRow } from './SwipableRow';

type DiscussionItemProps = Discussion & {
  onPress: () => void;
  onPressDelete: (id: string) => void;
  onPressArchive: (id: string) => void;
};

export const DiscussionItem: ComponentType<DiscussionItemProps> = ({
  onPress,
  onPressDelete,
  onPressArchive,
  ...item
}) => {
  const { styles } = useStyles(stylesheet);
  const user = useMemo(
    () =>
      item.participants.filter(
        participant => participant.id !== currentUser.id,
      )[0],
    [item.participants],
  );

  const handlePressDelete = useCallback(() => {
    onPressDelete(item.id);
  }, [item.id, onPressDelete]);

  const handlePressArchive = useCallback(() => {
    onPressArchive(item.id);
  }, [item.id, onPressArchive]);

  return (
    <SwipeableRow
      onPressDelete={handlePressDelete}
      onPressArchive={handlePressArchive}
    >
      <Pressable onPress={onPress}>
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
                <Text variant="body3" color="contentTertiary">
                  {formatRelativeDate(item.lastMessage.date)}
                </Text>
              </View>
              <Text variant="body2" color="contentSecondary" numberOfLines={2}>
                {item.lastMessage.content[0]}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </SwipeableRow>
  );
};

const stylesheet = createStyleSheet(theme => ({
  rowContainer: (pressed: boolean) => ({
    gap: theme.spacing.medium,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    minHeight: 84,
    backgroundColor: pressed
      ? theme.colors.backgroundTertiary
      : theme.colors.backgroundPrimary,
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
}));
