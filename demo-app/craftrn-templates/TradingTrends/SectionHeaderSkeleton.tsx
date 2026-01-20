import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Skeleton } from '@/craftrn-ui/components/Skeleton';

export const SectionHeaderSkeleton = () => (
  <View style={styles.container}>
    <Skeleton width={120} height={24} borderRadius={6} />
    <Skeleton width={70} height={18} borderRadius={6} />
  </View>
);

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
