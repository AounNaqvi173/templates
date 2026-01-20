import React, { ComponentType } from 'react';
import { ScrollView, View } from 'react-native';
import { Card } from '@/craftrn-ui/components/Card';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { AssetGridItem } from './AssetGridItem';
import { AssetListItem } from './AssetListItem';
import { assets, AssetsItem } from './data/assets';
import { ExchangeRate } from './ExchangeRate';
import { PortfolioHeader } from './PortfolioHeader';
import { SectionHeader } from './SectionHeader';

const [currencyAssets, cryptoAssets] = [
  assets.filter(item => item.type === 'currency'),
  assets.filter(item => item.type === 'crypto'),
];

type Props = {
  onPressAsset: (assetId: AssetsItem['id']) => () => void;
};

export const TradingDashboardScreen: ComponentType<Props> = ({
  onPressAsset,
}) => {
  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 0 }}
      contentContainerStyle={styles.scrollContent}
    >
      <PortfolioHeader />

      <View style={styles.sectionContainer}>
        <SectionHeader title="Trending forex" />
        <Card style={styles.sectionContent}>
          {currencyAssets.map((asset, index) => (
            <AssetListItem
              key={asset.id}
              onPress={onPressAsset(asset.id)}
              itemRight={
                <ExchangeRate
                  value={asset.sellPrice}
                  symbol={asset.toSymbol}
                  change={asset.change}
                />
              }
              text={asset.name}
              textBelow={`${asset.fromTicker} to ${asset.toTicker}`}
              imageURL={asset.imageURL}
              divider={index !== currencyAssets.length - 1}
            />
          ))}
        </Card>
      </View>

      <View style={styles.sectionContainer}>
        <SectionHeader title="Trending cryptos" />
        <Card style={[styles.sectionContent, styles.cryptoContainer]}>
          {cryptoAssets.map(asset => (
            <AssetGridItem
              key={asset.id}
              onPress={onPressAsset(asset.id)}
              label={asset.name}
              change={asset.change}
              imageURL={asset.imageURL}
            />
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create(theme => ({
  scrollContent: {
    gap: theme.spacing.xlarge,
    paddingTop: theme.spacing.small,
    paddingBottom: UnistylesRuntime.insets.bottom + theme.spacing.xlarge,
  },
  sectionContainer: {
    gap: theme.spacing.small,
  },
  sectionContent: {
    marginHorizontal: theme.spacing.large,
  },
  cryptoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));
