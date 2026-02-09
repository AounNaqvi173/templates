import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Avatar } from '@/craftrn-ui/components/Avatar';
import React, { ComponentProps, ComponentType } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = Pick<
  ComponentProps<typeof ListItem>,
  'onPress' | 'text' | 'textBelow' | 'itemRight'
> & {
  divider?: boolean;
  imageURL: string;
  style?: ViewStyle | ViewStyle[];
};

export const AssetListItem: ComponentType<Props> = ({
  divider = true,
  imageURL,
  ...listItemProps
}) => {
  return (
    <ListItem
      {...listItemProps}
      style={[styles.listItem, StyleSheet.flatten(listItemProps?.style)]}
      itemLeft={
        <View style={styles.itemLeft}>
          <Avatar
            source={{
              uri: imageURL,
            }}
          />
        </View>
      }
      divider={divider}
    />
  );
};

const styles = StyleSheet.create(theme => ({
  listItem: {
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  itemLeft: {
    marginRight: theme.spacing.medium,
  },
}));
