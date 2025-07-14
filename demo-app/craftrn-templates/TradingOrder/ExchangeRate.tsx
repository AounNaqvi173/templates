import { Text } from '@/craftrn-ui/components/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import { ChevronUp } from '@/tetrisly-icons/ChevronUp';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
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
  const { styles, theme } = useStyles(stylesheet);
  const isNegative = change.substring(0, 1) === '-';

  return (
    <View style={styles.container}>
      <Text variant="body1" style={styles.value}>
        {`${symbol}${formatCurrency(parseFloat(value))}`}
      </Text>
      <View style={styles.changeContainer}>
        {isNegative ? (
          <ChevronDown size={16} color={theme.colors.negativePrimary} />
        ) : (
          <ChevronUp size={16} color={theme.colors.positivePrimary} />
        )}
        <Text variant="body2" style={styles.change(isNegative)}>
          {change}
        </Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'flex-end',
  },
  value: {
    fontWeight: 'bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: (isNegative: boolean) => ({
    marginLeft: theme.spacing.xsmall,
    color: isNegative
      ? theme.colors.negativePrimary
      : theme.colors.positivePrimary,
  }),
}));
