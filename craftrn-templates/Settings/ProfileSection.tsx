import { Avatar } from '@/craftrn-ui/components/Avatar';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Card } from '../../craftrn-ui/components/Card';

type Props = {
  onPress: VoidFunction;
};

export const ProfileSection: ComponentType<Props> = ({ onPress }) => {
  const { theme } = useUnistyles();

  // Mock user data - in a real app, this would come from user context/state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: undefined, // Will show initials fallback
    initials: 'JD',
  };

  return (
    <Card style={styles.card}>
      <ListItem
        style={styles.listItem}
        itemLeft={
          <View style={styles.itemLeft}>
            <Avatar
              source={user.avatar}
              fallbackInitials={user.initials}
              size="large"
              fallbackColor={0}
            />
          </View>
        }
        text={user.name}
        textBelow={user.email}
        itemRight={<ChevronRight color={theme.colors.contentPrimary} />}
        onPress={onPress}
      />
    </Card>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    marginBottom: theme.spacing.small,
    marginHorizontal: theme.spacing.large,
  },
  listItem: {
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium,
  },
  itemLeft: {
    marginRight: theme.spacing.medium,
  },
}));
