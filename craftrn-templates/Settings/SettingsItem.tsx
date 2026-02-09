import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type SettingsItemProps = ComponentProps<typeof ListItem> & {
  chevronRight?: boolean;
};

export const SettingsItem: ComponentType<SettingsItemProps> = ({
  divider = true,
  itemLeft,
  chevronRight = true,
  ...listItemProps
}) => {
  const { theme } = useUnistyles();
  const leftItem = itemLeft ? (
    <View style={styles.itemLeft}>{itemLeft}</View>
  ) : undefined;
  const rightItem = chevronRight ? (
    <View style={styles.itemRight}>
      <ChevronRight color={theme.colors.contentPrimary} />
    </View>
  ) : undefined;
  return (
    <ListItem
      style={styles.listItem}
      divider={divider}
      itemLeft={leftItem}
      itemRight={rightItem}
      {...listItemProps}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  listItem: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    minHeight: 52,
  },
  itemLeft: {
    marginRight: theme.spacing.small,
  },
  itemRight: {
    marginLeft: theme.spacing.small,
  },
}));
