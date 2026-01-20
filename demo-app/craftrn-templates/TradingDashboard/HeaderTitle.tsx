import { Avatar } from '@/craftrn-ui/components/Avatar/Avatar';
import {
  ContextMenu,
  type ContextMenuElement,
} from '@/craftrn-ui/components/ContextMenu/ContextMenu';
import { Text } from '@/craftrn-ui/components/Text/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import { Help } from '@/tetrisly-icons/Help';
import { Settings } from '@/tetrisly-icons/Settings';
import { User } from '@/tetrisly-icons/User';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export const HeaderTitle = () => {
  const { theme } = useUnistyles();

  const iconProps = {
    color: theme.colors.contentSecondary,
    size: 20,
  };

  const menuItems: ContextMenuElement[] = [
    {
      type: 'item',
      id: 'view-profile',
      label: 'View profile',
      itemLeft: <User {...iconProps} />,
      onPress: () => {
        // Handle view profile action
        console.log('View profile pressed');
      },
    },
    {
      type: 'item',
      id: 'settings',
      label: 'Settings',
      itemLeft: <Settings {...iconProps} />,
      onPress: () => {
        // Handle settings action
        console.log('Settings pressed');
      },
    },
    {
      type: 'item',
      id: 'help',
      label: 'Help',
      itemLeft: <Help {...iconProps} />,
      onPress: () => {
        // Handle help action
        console.log('Help pressed');
      },
    },
  ];

  return (
    <ContextMenu
      items={menuItems}
      menuAnchorPosition="bottom-left"
      trigger={onPress => (
        <Pressable style={styles.container} onPress={onPress}>
          <Avatar
            fallbackInitials="A"
            fallbackColor={0}
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            size="small"
          />
          <View style={styles.textContainer}>
            <View style={styles.labelRow}>
              <Text variant="body2" style={styles.label}>
                Account
              </Text>
              <ChevronDown color={theme.colors.contentPrimary} size={16} />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    marginLeft: theme.spacing.small,
  },
  textContainer: {
    flexDirection: 'column',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xxsmall,
  },
  label: {
    fontWeight: 'bold',
  },
}));
