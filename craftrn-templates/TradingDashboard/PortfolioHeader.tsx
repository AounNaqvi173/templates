import { Button } from '@/craftrn-ui/components/Button';
import { Card } from '@/craftrn-ui/components/Card';
import { Text } from '@/craftrn-ui/components/Text';
import { Download } from '@/tetrisly-icons/Download';
import { Paperplane } from '@/tetrisly-icons/Paperplane';
import { Plus } from '@/tetrisly-icons/Plus';
import { TrendDown } from '@/tetrisly-icons/TrendDown';
import { TrendUp } from '@/tetrisly-icons/TrendUp';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { PortfolioChart, PortfolioChartRef } from './PortfolioChart';
import { portfolioChartData } from './data/chart';
import { PortfolioChartValueChange } from './PortfolioChart/PortfolioChart';

type PortfolioData = {
  value: string;
  change: string;
  changePercentage: string;
  isPositive: boolean;
};

const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatChange = (change: number): string =>
  `${change >= 0 ? '+' : ''}${formatCurrency(change)}`;

const formatPercentage = (percentage: number): string =>
  `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}`;

const getInitialPortfolioData = (): PortfolioData => {
  const currentValue = portfolioChartData[portfolioChartData.length - 1].value;
  const initialValue = portfolioChartData[0].value;
  const change = currentValue - initialValue;
  const changePercentage = (change / initialValue) * 100;

  return {
    value: formatCurrency(currentValue),
    change: formatChange(change),
    changePercentage: formatPercentage(changePercentage),
    isPositive: change >= 0,
  };
};

export const PortfolioHeader = () => {
  const { theme } = useUnistyles();
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(
    getInitialPortfolioData(),
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const chartRef = useRef<PortfolioChartRef>(null);

  const handleChartValueChange = useCallback(
    (change: PortfolioChartValueChange) => {
      const isPositive = change.change >= 0;
      setPortfolioData({
        value: formatCurrency(change.value),
        change: formatChange(change.change),
        changePercentage: formatPercentage(change.changePercentage),
        isPositive,
      });
      setSelectedDate(formatDate(change.point.timestamp));
    },
    [],
  );

  const handleDismiss = useCallback(() => {
    setPortfolioData(getInitialPortfolioData());
    setSelectedDate(null);
  }, []);

  const handlePressOutside = useCallback(() => {
    chartRef.current?.dismiss();
  }, []);

  return (
    <Card style={styles.container}>
      <Pressable onPress={handlePressOutside} style={styles.pressableContainer}>
        <Text variant="body2" style={styles.label}>
          {selectedDate ? `Balance as of ${selectedDate}` : 'Total balance'}
        </Text>
        <Text variant="heading2" style={styles.value}>
          {portfolioData.value}
        </Text>
        <View style={styles.changeContainer}>
          {portfolioData.isPositive ? (
            <TrendUp size={18} color={theme.colors.sentimentPositive} />
          ) : (
            <TrendDown size={18} color={theme.colors.sentimentNegative} />
          )}
          <Text
            variant="body2"
            style={
              portfolioData.isPositive
                ? styles.changeTextPositive
                : styles.changeTextNegative
            }
          >
            {portfolioData.change}
          </Text>
          <View
            style={[
              styles.percentageContainer,
              portfolioData.isPositive
                ? styles.percentageContainerPositive
                : styles.percentageContainerNegative,
            ]}
          >
            <Text
              variant="body2"
              style={
                portfolioData.isPositive
                  ? styles.percentageTextPositive
                  : styles.percentageTextNegative
              }
            >
              {portfolioData.changePercentage}%
            </Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <PortfolioChart
            ref={chartRef}
            data={portfolioChartData}
            height={120}
            onValueChange={handleChartValueChange}
            onDismiss={handleDismiss}
          />
        </View>
      </Pressable>

      <View style={styles.buttonsContainer}>
        <Button
          size="small"
          variant="primary"
          onPress={() => console.log('Send pressed')}
          iconLeft={
            <Paperplane
              color={theme.colors.interactivePrimaryContent}
              size={16}
            />
          }
        >
          Send
        </Button>
        <Button
          size="small"
          variant="primary"
          onPress={() => console.log('Receive pressed')}
          iconLeft={
            <Download
              color={theme.colors.interactivePrimaryContent}
              size={16}
            />
          }
        >
          Receive
        </Button>
        <Button
          size="small"
          variant="neutral"
          onPress={() => console.log('Buy pressed')}
          iconLeft={
            <Plus color={theme.colors.interactiveNeutralContent} size={16} />
          }
        >
          Buy
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    marginHorizontal: theme.spacing.large,
    gap: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
  },
  pressableContainer: {
    width: '100%',
  },
  chartContainer: {
    marginTop: theme.spacing.small,
  },
  label: {
    textAlign: 'left',
    color: theme.colors.contentTertiary,
  },
  value: {
    textAlign: 'left',
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing.xsmall,
  },
  changeTextPositive: {
    color: theme.colors.sentimentPositive,
  },
  changeTextNegative: {
    color: theme.colors.sentimentNegative,
  },
  percentageContainer: {
    paddingHorizontal: theme.spacing.xsmall,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xsmall,
  },
  percentageContainerPositive: {
    backgroundColor: theme.colors.sentimentSecondaryPositive,
  },
  percentageContainerNegative: {
    backgroundColor: theme.colors.sentimentSecondaryNegative,
  },
  percentageTextPositive: {
    color: theme.colors.sentimentPositive,
  },
  percentageTextNegative: {
    color: theme.colors.sentimentNegative,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
}));
