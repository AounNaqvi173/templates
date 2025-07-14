import { Text } from '@/craftrn-ui/components/Text';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { profileData } from './data/profileData';

export const ProfileStats = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{profileData.totalOrders}</Text>
        <Text style={styles.statLabel}>Total Orders</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>4.8 ★</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>2+</Text>
        <Text style={styles.statLabel}>Years Active</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    alignItems: 'center',
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    ...theme.textVariants.heading3,
    fontWeight: 'bold',
    color: theme.colors.contentPrimary,
    marginBottom: theme.spacing.xsmall,
  },
  statLabel: {
    ...theme.textVariants.body3,
    color: theme.colors.contentSecondary,
    textAlign: 'center',
  },
}));
