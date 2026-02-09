import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Skeleton } from '@/craftrn-ui/components/Skeleton';

export const MarketSentimentSkeleton: ComponentType = () => (
  <View style={styles.container}>
    <Skeleton width="100%" height={8} borderRadius={4} />
    <View style={styles.labelsContainer}>
      <View style={styles.leftLabelContainer}>
        <Skeleton width={100} height={14} borderRadius={4} />
        <Skeleton width={40} height={24} borderRadius={4} />
      </View>
      <View style={styles.rightLabelContainer}>
        <Skeleton width={100} height={14} borderRadius={4} />
        <Skeleton width={40} height={24} borderRadius={4} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.spacing.medium,
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftLabelContainer: {
    alignItems: 'flex-start',
    gap: theme.spacing.xxsmall,
  },
  rightLabelContainer: {
    alignItems: 'flex-end',
    gap: theme.spacing.xxsmall,
  },
}));
