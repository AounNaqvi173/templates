import React, { ComponentType, useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '@/craftrn-ui/components/Card';
import { AssetListItem } from './AssetListItem';
import { AssetListItemSkeleton } from './AssetListItemSkeleton';
import { assets, type AssetsItem } from './data/assets';
import { ExchangeRate } from './ExchangeRate';
import { SectionHeader } from './SectionHeader';
import { SectionHeaderSkeleton } from './SectionHeaderSkeleton';
import type { FilterType } from './TradingTrendsScreen';

type Props = {
  filterType: FilterType;
  isLoading: boolean;
  onPressAsset: (assetId: AssetsItem['id']) => () => void;
};

export const TopLosers: ComponentType<Props> = ({
  filterType,
  isLoading,
  onPressAsset,
}) => {
  const filteredLosers = useMemo(() => {
    const allLosers = assets.filter(asset => asset.change.startsWith('-'));
    if (filterType === 'overview') {
      const shares = allLosers.find(a => a.type === 'shares');
      const crypto = allLosers.find(a => a.type === 'crypto');
      const currency = allLosers.find(a => a.type === 'currency');
      return [shares, crypto, currency].filter(
        (asset): asset is AssetsItem => asset !== undefined,
      );
    }
    return allLosers.filter(asset => asset.type === filterType).slice(0, 3);
  }, [filterType]);

  return (
    <View style={styles.sectionContainer}>
      {isLoading ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader title="Top losers" onPressSeeMore={() => { }} />
      )}
      <Card style={styles.sectionContent}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
            <AssetListItemSkeleton
              key={`skeleton-loser-${index}`}
              divider={index !== 2}
            />
          ))
          : filteredLosers.map((stock, index) => (
            <AssetListItem
              key={stock.id}
              onPress={onPressAsset(stock.id)}
              itemRight={
                <ExchangeRate
                  value={stock.sellPrice}
                  symbol={
                    stock.type === 'crypto' || stock.type === 'shares'
                      ? stock.fromSymbol
                      : stock.toSymbol
                  }
                  change={stock.change}
                />
              }
              text={stock.name}
              textBelow={`${stock.fromTicker} to ${stock.toTicker}`}
              imageURL={stock.imageURL}
              divider={index !== filteredLosers.length - 1}
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
