import { ArrowUp } from '@/tetrisly-icons/ArrowUp';
import { Home } from '@/tetrisly-icons/Home';
import { LayerTwo } from '@/tetrisly-icons/LayerTwo';
import { Search } from '@/tetrisly-icons/Search';
import { TrendUp } from '@/tetrisly-icons/TrendUp';
import React, { ComponentType, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { Button } from '@/craftrn-ui/components/Button';
import { InputSearch } from '@/craftrn-ui/components/InputSearch';
import { type AssetsItem } from './data/assets';
import { MarketSentimentSection } from './MarketSentimentSection';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';
import { TopTraders } from './TopTraders';

export type FilterType = 'overview' | 'shares' | 'crypto' | 'currency';

const filters: FilterType[] = ['overview', 'shares', 'crypto', 'currency'];

const filterIcons = {
  overview: Home,
  shares: TrendUp,
  crypto: LayerTwo,
  currency: ArrowUp,
} as const;

type Props = {
  onPressAsset: (assetId: AssetsItem['id']) => () => void;
};

export const TradingTrendsScreen: ComponentType<Props> = ({ onPressAsset }) => {
  const { theme } = useUnistyles();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('overview');
  const [displayedFilter, setDisplayedFilter] = useState<FilterType>('overview');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayedFilter(selectedFilter);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedFilter]);


  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 0 }}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <InputSearch
            placeholder="Search stocks, crypto, or indices..."
            value={searchValue}
            onChangeText={setSearchValue}
            itemLeft={
              <View style={styles.searchIconContainer}>
                <Search color={theme.colors.contentTertiary} size={20} />
              </View>
            }
          />
        </View>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.filtersContent}
          renderItem={({ item }) => {
            const Icon = filterIcons[item];
            const isSelected = selectedFilter === item;
            return (
              <Button
                size="small"
                variant={isSelected ? 'primary' : 'neutral-secondary'}
                onPress={() => setSelectedFilter(item)}
                iconLeft={
                  <Icon
                    color={
                      isSelected
                        ? theme.colors.interactivePrimaryContent
                        : theme.colors.interactiveNeutralContent
                    }
                    size={16}
                  />
                }
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            );
          }}
        />
      </View>

      <TopGainers
        filterType={displayedFilter}
        isLoading={isLoading}
        onPressAsset={onPressAsset}
      />

      <TopLosers
        filterType={displayedFilter}
        isLoading={isLoading}
        onPressAsset={onPressAsset}
      />

      <TopTraders filterType={displayedFilter} isLoading={isLoading} />

      <MarketSentimentSection filterType={displayedFilter} isLoading={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create(theme => ({
  scrollContent: {
    gap: theme.spacing.xlarge,
    paddingTop: theme.spacing.small,
    paddingBottom: UnistylesRuntime.insets.bottom + theme.spacing.xlarge,
  },
  searchContainer: {
    gap: theme.spacing.medium,
  },
  searchBar: {
    paddingHorizontal: theme.spacing.large,
  },
  searchIconContainer: {
    paddingLeft: theme.spacing.small,
  },
  filtersContent: {
    marginHorizontal: theme.spacing.large,
    gap: theme.spacing.small,
  },
}));
