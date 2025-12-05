import { Text } from '@/craftrn-ui/components/Text';
import { ChevronUp } from '@/tetrisly-icons/ChevronUp';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type PortfolioData = {
  value: string;
  change: string;
  changePercentage: string;
  isPositive: boolean;
};

const portfolioData: PortfolioData = {
  value: '$12,340.21',
  change: '$121.43',
  changePercentage: '0.95',
  isPositive: true,
};

export const PortfolioHeader = () => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Portfolio value</Text>
      <View>
        <Text variant="heading1" style={styles.value}>
          {portfolioData.value}
        </Text>
        <View style={styles.changeContainer}>
          <ChevronUp size={20} color={theme.colors.sentimentPositive} />
          <Text variant="body2" style={styles.changeText}>
            +{portfolioData.change} (+{portfolioData.changePercentage}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.small,
    paddingVertical: theme.spacing.xlarge,
  },
  label: {
    textAlign: 'center',
  },
  value: {
    textAlign: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  changeText: {
    fontWeight: 'bold',
    color: theme.colors.sentimentPositive,
  },
}));
