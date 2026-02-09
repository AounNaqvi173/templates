import { Text } from '@/craftrn-ui/components/Text';
import { TrendDown } from '@/tetrisly-icons/TrendDown';
import { TrendUp } from '@/tetrisly-icons/TrendUp';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { formatCurrency } from './utils/numbers';

type ExchangeRateProps = {
  value: string;
  symbol: string;
  change: string;
};

export const ExchangeRate: ComponentType<ExchangeRateProps> = ({
  value,
  symbol,
  change,
}) => {
  const { theme } = useUnistyles();
  const isNegative = change.substring(0, 1) === '-';

  return (
    <View style={styles.container}>
      <Text variant="body1" style={styles.value}>
        {`${symbol}${formatCurrency(parseFloat(value))}`}
      </Text>
      <View style={styles.changeContainer}>
        {isNegative ? (
          <TrendDown size={14} color={theme.colors.sentimentNegative} />
        ) : (
          <TrendUp size={14} color={theme.colors.sentimentPositive} />
        )}
        <Text variant="body3" style={styles.change(isNegative)}>
          {change}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'flex-end',
  },
  value: {
    fontWeight: 'bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xsmall,
  },
  change: (isNegative: boolean) => ({
    color: isNegative
      ? theme.colors.sentimentNegative
      : theme.colors.sentimentPositive,
  }),
}));
