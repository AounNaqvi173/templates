import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '@/craftrn-ui/components/Text';
import type { FilterType } from './TradingTrendsScreen';

type Props = {
  buyingPressure: number;
  sellingPressure: number;
  filterType: FilterType;
};

const DOT_SIZE = 16;

export const MarketSentiment: ComponentType<Props> = ({
  buyingPressure,
  sellingPressure,
  filterType,
}) => {
  const filterLabel = filterType === 'overview' ? 'overall' : filterType;
  return (
    <View style={styles.container}>
      <View style={styles.barWrapper}>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barSegment,
              styles.buyingBar,
              { width: `${buyingPressure}%` },
            ]}
          />
          <View
            style={[
              styles.barSegment,
              styles.sellingBar,
              { width: `${sellingPressure}%` },
            ]}
          />
        </View>
        {buyingPressure > 0 && buyingPressure < 100 && (
          <View
            style={[
              styles.boundaryDot,
              { left: `${buyingPressure}%` },
            ]}
          />
        )}
      </View>
      <View style={styles.labelsContainer}>
        <View style={styles.buyingLabelContainer}>
          <Text variant="body3" style={styles.buyingLabel}>
            Buying pressure
          </Text>
          <Text variant="heading3" style={styles.value}>
            {buyingPressure}%
          </Text>
        </View>
        <View style={styles.sellingLabelContainer}>
          <Text variant="body3" style={styles.sellingLabel}>
            Selling pressure
          </Text>
          <Text variant="heading3" style={styles.value}>
            {sellingPressure}%
          </Text>
        </View>
      </View>
      <View style={styles.filterBadge}>
        <Text variant="body3" style={styles.filterBadgeText}>
          {filterLabel} market
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.spacing.medium,
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
  },
  barWrapper: {
    position: 'relative',
    height: DOT_SIZE,
    justifyContent: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    height: 8,
    borderRadius: theme.borderRadius.xsmall,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundElevated,
  },
  barSegment: {
    height: '100%',
  },
  buyingBar: {
    backgroundColor: theme.colors.sentimentPositive,
  },
  sellingBar: {
    backgroundColor: theme.colors.sentimentNegative,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyingLabelContainer: {
    alignItems: 'flex-start',
    gap: theme.spacing.xxsmall,
  },
  sellingLabelContainer: {
    alignItems: 'flex-end',
    gap: theme.spacing.xxsmall,
  },
  buyingLabel: {
    color: theme.colors.sentimentPositive,
  },
  sellingLabel: {
    color: theme.colors.sentimentNegative,
  },
  value: {
    color: theme.colors.contentPrimary,
    fontWeight: 'bold',
  },
  filterBadge: {
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.xsmall,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.backgroundNeutral,
    marginTop: theme.spacing.xsmall,
  },
  filterBadgeText: {
    color: theme.colors.contentSecondary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  boundaryDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: theme.colors.contentPrimary,
    borderWidth: 2,
    borderColor: theme.colors.backgroundScreen,
    top: 0,
    marginLeft: -DOT_SIZE / 2,
    zIndex: 1,
  },
}));
