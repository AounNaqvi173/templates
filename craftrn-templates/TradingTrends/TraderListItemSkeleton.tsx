import React, { ComponentType } from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Divider } from '@/craftrn-ui/components/Divider';
import { Skeleton } from '@/craftrn-ui/components/Skeleton';

type Props = {
  divider?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export const TraderListItemSkeleton: ComponentType<Props> = ({
  divider = true,
  style,
}) => {
  return (
    <>
      <View style={[styles.itemContainer, StyleSheet.flatten(style)]}>
        <View style={styles.itemLeft}>
          <Skeleton width={40} height={40} borderRadius={20} />
        </View>
        <View style={styles.itemContent}>
          <Skeleton width="60%" height={16} borderRadius={4} />
          <Skeleton width="40%" height={14} borderRadius={4} />
        </View>
        <View style={styles.itemRight}>
          <Skeleton width={60} height={32} borderRadius={16} />
        </View>
      </View>
      {divider && <Divider />}
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  itemLeft: {
    marginRight: theme.spacing.medium,
  },
  itemContent: {
    flex: 1,
    flexShrink: 1,
    minWidth: 100,
    gap: theme.spacing.xxsmall,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
}));
