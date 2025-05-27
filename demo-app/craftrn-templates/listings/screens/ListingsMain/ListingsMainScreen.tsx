import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { InputSearch } from '@/craftrn-ui/components/InputSearch';
import { Search } from '@/tetrisly-icons/Search';
import { Slider } from '@/tetrisly-icons/Slider';
import { useRouter } from 'expo-router';
import { ComponentType, default as React, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { listingsData } from '../../data/listings';
import { ListingCard } from './ListingCard';

export const ListingsMainScreen: ComponentType = () => {
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  const handlePressListing = useCallback(
    (id: string) => () => {
      router.push(`/listings/details/${id}`);
    },
    [router],
  );

  const handlePressSearch = useCallback(() => {
    router.push('/listings/search');
  }, [router]);

  const handlePressFilter = useCallback(() => {
    router.push('/listings/filters');
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputSearchWrapper}>
          <InputSearch
            placeholder="Search for a destination"
            leftAccessory={
              <View style={styles.inputSearchLeftAccessory}>
                <Search color={theme.colors.contentTertiary} />
              </View>
            }
            rightAccessory={
              <ButtonRound
                renderContent={({ iconSize }) => (
                  <Slider
                    size={iconSize}
                    color={theme.colors.contentTertiary}
                  />
                )}
                onPress={handlePressFilter}
              />
            }
            readOnly
            onPress={handlePressSearch}
          />
        </View>
      </View>
      <FlatList
        data={listingsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listingCardContainer}>
            <ListingCard item={item} onPress={handlePressListing(item.id)} />
          </View>
        )}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingBottom: UnistylesRuntime.insets.bottom },
        ]}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingTop: UnistylesRuntime.insets.top,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.small,
    paddingVertical: theme.spacing.large,
  },
  inputSearchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    position: 'relative',
    shadowColor: theme.colors.contentTertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.05,
  },
  inputSearchLeftAccessory: {
    paddingHorizontal: theme.spacing.small,
  },
  listingCardContainer: {
    paddingHorizontal: theme.spacing.large,
  },
  textFieldView: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.large,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  flatListContent: {
    gap: theme.spacing.xlarge,
  },
}));
