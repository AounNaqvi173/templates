import { Avatar } from '@/craftrn-ui/components/Avatar/Avatar';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { User } from '../../data/users';
import { formatRelativeDate } from '../../utils/date';

export const HeaderTitle = ({ user }: { user: User }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Avatar
        fallbackInitials={user.initials}
        fallbackColor={user.avatarColor}
        uri={user.avatarUri}
        size="small"
        showOnlineIndicator={user.isOnline}
      />
      <View>
        <Text variant="body2" style={styles.name}>
          {user.name}
        </Text>
        <Text variant="body3" color="contentSecondary">
          {user.isOnline
            ? 'Online'
            : `Last seen ${formatRelativeDate(user.lastSeen)}`}
        </Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    marginLeft: theme.spacing.small,
  },
  name: {
    fontWeight: 'bold',
  },
}));
