import React, { ComponentType, useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '@/craftrn-ui/components/Card';
import { SectionHeader } from './SectionHeader';
import { SectionHeaderSkeleton } from './SectionHeaderSkeleton';
import { topTraders } from './data/traders';
import { TraderListItem } from './TraderListItem';
import { TraderListItemSkeleton } from './TraderListItemSkeleton';
import type { FilterType } from './TradingTrendsScreen';

type Props = {
  filterType: FilterType;
  isLoading: boolean;
};

export const TopTraders: ComponentType<Props> = ({ filterType, isLoading }) => {
  const filteredTraders = useMemo(() => {
    if (filterType === 'overview') {
      const shares = topTraders.find(t => t.type === 'shares');
      const crypto = topTraders.find(t => t.type === 'crypto');
      const currency = topTraders.find(t => t.type === 'currency');
      return [shares, crypto, currency].filter(
        (trader): trader is typeof topTraders[0] => trader !== undefined,
      );
    }
    return topTraders.filter(trader => trader.type === filterType).slice(0, 3);
  }, [filterType]);

  return (
    <View style={styles.sectionContainer}>
      {isLoading ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader title="Top traders" onPressSeeMore={() => { }} />
      )}
      <Card style={styles.sectionContent}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
            <TraderListItemSkeleton
              key={`skeleton-trader-${index}`}
              divider={index !== 2}
            />
          ))
          : filteredTraders.map((trader, index) => (
            <TraderListItem
              key={trader.id}
              nickname={trader.nickname}
              profitPercentage={trader.profitPercentage}
              avatarURL={trader.avatarURL}
              divider={index !== filteredTraders.length - 1}
            />
          ))}
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
}));
