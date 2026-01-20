import { ArrowUp } from '@/tetrisly-icons/ArrowUp';
import { Home } from '@/tetrisly-icons/Home';
import { LayerTwo } from '@/tetrisly-icons/LayerTwo';
import { TrendUp } from '@/tetrisly-icons/TrendUp';
import React, { ComponentType, useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Card } from '@/craftrn-ui/components/Card';
import { assets } from './data/assets';
import { MarketSentiment } from './MarketSentiment';
import { MarketSentimentSkeleton } from './MarketSentimentSkeleton';
import { SectionHeader } from './SectionHeader';
import { SectionHeaderSkeleton } from './SectionHeaderSkeleton';
import type { FilterType } from './TradingTrendsScreen';

const filterIcons = {
  overview: Home,
  shares: TrendUp,
  crypto: LayerTwo,
  currency: ArrowUp,
} as const;

type Props = {
  filterType: FilterType;
  isLoading: boolean;
};

export const MarketSentimentSection: ComponentType<Props> = ({
  filterType,
  isLoading,
}) => {
  const { theme } = useUnistyles();

  const marketSentiment = useMemo(() => {
    const relevantAssets =
      filterType === 'overview'
        ? assets
        : assets.filter(asset => asset.type === filterType);

    const gainers = relevantAssets.filter(asset => asset.change.startsWith('+'));
    const losers = relevantAssets.filter(asset => asset.change.startsWith('-'));

    const total = gainers.length + losers.length;
    if (total === 0) {
      return { buyingPressure: 50, sellingPressure: 50 };
    }

    const buyingPressure = Math.round((gainers.length / total) * 100);
    const sellingPressure = 100 - buyingPressure;

    return { buyingPressure, sellingPressure };
  }, [filterType]);

  const title =
    filterType === 'overview'
      ? 'Market sentiment'
      : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} sentiment`;

  const iconLeft =
    filterType !== 'overview' && filterIcons[filterType] ? (
      <View style={styles.filterIconContainer}>
        {React.createElement(filterIcons[filterType], {
          color: theme.colors.contentAccent,
          size: 18,
        })}
      </View>
    ) : undefined;

  return (
    <View style={styles.sectionContainer}>
      {isLoading ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader title={title} iconLeft={iconLeft} />
      )}
      <Card style={styles.sectionContent}>
        {isLoading ? (
          <MarketSentimentSkeleton />
        ) : (
          <MarketSentiment
            buyingPressure={marketSentiment.buyingPressure}
            sellingPressure={marketSentiment.sellingPressure}
            filterType={filterType}
          />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  sectionContainer: {
    gap: theme.spacing.small,
  },
  sectionContent: {
    marginHorizontal: theme.spacing.large,
  },
  filterIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
