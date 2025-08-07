import { InputSearch } from '@/craftrn-ui/components/InputSearch';
import { Text } from '@/craftrn-ui/components/Text';
import { Search } from '@/tetrisly-icons/Search';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  ComponentType,
  default as React,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Platform, SectionList, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import {
  Destination,
  popularDestinations,
  recentSearches,
  searchDestinations,
} from './data/destinations';
import { DestinationItem } from './DestinationItem';

type Section = {
  title: string;
  data: Destination[];
};

export const StaysSearchScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const [search, setSearch] = useState<string>('');
  const headerHeight = useHeaderHeight();

  // Use measured header heights since React Navigation calculations are incorrect
  const keyboardVerticalOffset =
    Platform.OS === 'android'
      ? 56
      : UnistylesRuntime.insets.bottom
        ? headerHeight - theme.spacing.large
        : headerHeight;

  const sections: Section[] = useMemo(
    () =>
      search !== ''
        ? [
            {
              title: 'Search Results',
              data: searchDestinations.filter(destination =>
                destination.label.toLowerCase().includes(search.toLowerCase()),
              ),
            },
          ]
        : [
            { title: 'Recent searches', data: recentSearches },
            { title: 'Popular destinations', data: popularDestinations },
          ],
    [search],
  );

  const renderItem = useCallback(
    ({ item }: { item: Destination }) => (
      <DestinationItem icon={item.icon} label={item.label} />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: Section }) => (
      <Text
        variant="body3"
        color="contentTertiary"
        style={styles.sectionHeader}
      >
        {title}
      </Text>
    ),
    [styles.sectionHeader],
  );

  const renderSectionFooter = useCallback(
    ({ section }: { section: Section }) =>
      sections.indexOf(section) !== sections.length - 1 ? (
        <View style={styles.divider} />
      ) : null,
    [styles.divider, sections],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.inputSearchContainer}>
          <InputSearch
            placeholder="Destination or hotel name"
            leftAccessory={
              <View style={styles.inputSearchLeftAccessory}>
                <Search color={theme.colors.contentTertiary} />
              </View>
            }
            value={search}
            onChangeText={setSearch}
            autoFocus
            returnKeyType="search"
          />
        </View>
        <SectionList
          sections={sections}
          keyExtractor={item => item.label}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          style={styles.sectionList}
          stickySectionHeadersEnabled={false}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  sectionList: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: theme.spacing.small,
    paddingBottom: theme.spacing.xlarge,
  },
  inputSearchContainer: {
    paddingHorizontal: theme.spacing.large,
    marginVertical: theme.spacing.medium,
  },
  inputSearchLeftAccessory: {
    paddingHorizontal: theme.spacing.small,
  },
  divider: {
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
    marginHorizontal: theme.spacing.large,
    marginVertical: theme.spacing.large,
  },
  sectionHeader: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginHorizontal: theme.spacing.large,
    marginVertical: theme.spacing.medium,
  },
}));
