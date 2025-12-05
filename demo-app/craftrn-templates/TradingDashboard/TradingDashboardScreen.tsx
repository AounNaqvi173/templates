import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { Card } from '../../craftrn-ui/components/Card';
import { AssetGridItem } from './AssetGridItem';
import { AssetHighlights } from './AssetHighlights';
import { AssetListItem } from './AssetListItem';
import { assets, AssetsItem } from './data/assets';
import { ExchangeRate } from './ExchangeRate';
import { PortfolioHeader } from './PortfolioHeader';
import { SectionHeader } from './SectionHeader';

const [currencyAssets, cryptoAssets, sharesAssets] = [
  assets.filter(item => item.type === 'currency'),
  assets.filter(item => item.type === 'crypto'),
  assets.filter(item => item.type === 'shares'),
];

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

type Props = {
  onPressAsset: (assetId: AssetsItem['id']) => () => void;
};

export const TradingDashboardScreen: ComponentType<Props> = ({
  onPressAsset,
}) => {
  const scrollPosition = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollPosition.value, [0, 30, 60], [0, 0, 1]),
  }));

  return (
    <>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text variant="body1" style={styles.headerValue}>
          {portfolioData.value}
        </Text>
        <View style={styles.headerChangeContainer}>
          <Text variant="body3" style={styles.headerChangeText}>
            +{portfolioData.change} (+{portfolioData.changePercentage}%)
          </Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollIndicatorInsets={{ right: 0 }}
        onScroll={useAnimatedScrollHandler(event => {
          scrollPosition.value = event.contentOffset.y;
        })}
        contentContainerStyle={styles.scrollContent}
      >
        <PortfolioHeader />
        <View style={styles.sectionContainer}>
          <SectionHeader title="Highlights" />
          <AssetHighlights data={sharesAssets} />
        </View>

        <View style={styles.sectionContainer}>
          <SectionHeader title="Top exchange rates" />
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
                textBelow={asset.pairing}
                imageURL={asset.imageURL}
                divider={index !== currencyAssets.length - 1}
              />
            ))}
          </Card>
        </View>

        <View style={styles.sectionContainer}>
          <SectionHeader title="Top cryptos" />
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
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  header: {
    paddingBottom: theme.spacing.medium,
    borderBottomColor: theme.colors.borderNeutral,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundElevated,
    paddingTop: UnistylesRuntime.insets.top,
    zIndex: 1,
  },
  headerValue: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerChangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerChangeText: {
    fontWeight: 'bold',
    color: theme.colors.sentimentPositive,
  },
  scrollContent: {
    gap: theme.spacing.xlarge,
    paddingTop: UnistylesRuntime.insets.top + 8,
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
