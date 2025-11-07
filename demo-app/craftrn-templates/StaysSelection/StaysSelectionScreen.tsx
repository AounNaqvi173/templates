import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { InputSearch } from '@/craftrn-ui/components/InputSearch';
import { Search } from '@/tetrisly-icons/Search';
import { Slider } from '@/tetrisly-icons/Slider';
import { ComponentType, default as React } from 'react';
import { FlatList, View } from 'react-native';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { staysData } from './data/stays';
import { ListingCard } from './ListingCard';

type Props = {
  onPressListing: (id: string) => VoidFunction;
  onPressSearch: VoidFunction;
  onPressFilter: VoidFunction;
};

export const StaysSelectionScreen: ComponentType<Props> = ({
  onPressListing,
  onPressSearch,
  onPressFilter,
}) => {
  const { theme } = useUnistyles();

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
                variant="neutral"
                onPress={onPressFilter}
              />
            }
            readOnly
            onPress={onPressSearch}
          />
        </View>
      </View>
      <FlatList
        data={staysData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listingCardContainer}>
            <ListingCard item={item} onPress={onPressListing(item.id)} />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
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
    backgroundColor: theme.colors.backgroundElevated,
  },
  flatListContent: {
    gap: theme.spacing.xlarge,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
}));
