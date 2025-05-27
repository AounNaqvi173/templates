import { Text } from '@/craftrn-ui/components/Text';
import { useRouter } from 'expo-router';
import React, { ComponentType, useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AssetListItem } from '../../components/AssetListItem';
import { ExchangeRate } from '../../components/ExchangeRate';
import { assets, AssetsItem } from '../../data/assets';
import { AssetGridItem } from './AssetGridItem';
import { AssetHighlights } from './AssetHighlights';
import { PortfolioHeader } from './PortfolioHeader';

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

const SectionHeader = ({ title }: { title: string }) => {
  const { styles } = useStyles(sectionHeaderStylesheet);
  return (
    <View style={styles.container}>
      <Text variant="heading3">{title}</Text>
      <Text
        variant="body2"
        color="contentAccent"
        style={styles.action}
        onPress={() => {}}
      >
        See more
      </Text>
    </View>
  );
};

const sectionHeaderStylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    fontWeight: 'bold',
  },
}));

export const TradingMainScreen: ComponentType = () => {
  const { styles, theme } = useStyles(mainStylesheet);
  const router = useRouter();
  const scrollPosition = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollPosition.value, [0, 30, 60], [0, 0, 1]),
  }));

  const handlePressAsset = useCallback(
    (assetId: AssetsItem['id']) => () => {
      router.push(`/trading/invest/${assetId}`);
    },
    [router],
  );

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
        <SectionHeader title="Highlights" />
        <AssetHighlights data={sharesAssets} />

        <View style={styles.exchangeRatesContainer}>
          <SectionHeader title="Top exchange rates" />
          <View style={styles.exchangeRatesContent}>
            {currencyAssets.map((asset, index) => (
              <View style={styles.assetListItemWrapper} key={asset.id}>
                <AssetListItem
                  style={styles.listItem}
                  onPress={handlePressAsset(asset.id)}
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
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="Top cryptos" />
        <View style={styles.cryptoContainer}>
          {cryptoAssets.map(asset => (
            <AssetGridItem
              key={asset.id}
              onPress={handlePressAsset(asset.id)}
              label={asset.name}
              change={asset.change}
              imageURL={asset.imageURL}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </>
  );
};

const mainStylesheet = createStyleSheet(theme => ({
  header: {
    paddingBottom: theme.spacing.medium,
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
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
    color: theme.colors.positivePrimary,
  },
  scrollContent: {
    gap: theme.spacing.small,
    paddingTop: UnistylesRuntime.insets.top + 8,
    paddingBottom: UnistylesRuntime.insets.bottom + theme.spacing.xlarge,
  },
  exchangeRatesContainer: {
    gap: theme.spacing.medium,
    paddingVertical: theme.spacing.medium,
  },
  exchangeRatesContent: {
    borderRadius: theme.borderRadius.large,
    marginHorizontal: theme.spacing.large,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  assetListItemWrapper: {
    paddingHorizontal: theme.spacing.xsmall,
  },
  listItem: {
    paddingHorizontal: theme.spacing.small,
  },
  cryptoContainer: {
    borderRadius: theme.borderRadius.large,
    marginHorizontal: theme.spacing.large,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));
