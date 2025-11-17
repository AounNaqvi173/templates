import { InputText } from '@/craftrn-ui/components/InputText';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import { Search } from '@/tetrisly-icons/Search';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { Avatar } from '../../craftrn-ui/components/Avatar';
import { Divider } from '../../craftrn-ui/components/Divider';
import { countryCodes } from './data/countryCodes';

const FLAG_SIZE = 24;

export type CountryCode = (typeof countryCodes)[number]['code'];

export type Props = {
  countryCode?: CountryCode;
  onPressCountryCode: (countryCode: CountryCode) => void;
};

export const OnboardingCountryScreen: ComponentType<Props> = ({
  countryCode,
  onPressCountryCode,
}) => {
  const { theme } = useUnistyles();
  const headerHeight = useHeaderHeight();
  const [searchQuery, setSearchQuery] = useState('');

  const handlePressItem = useCallback(
    (item: (typeof countryCodes)[number]) => () => {
      onPressCountryCode(item.code);
    },
    [onPressCountryCode],
  );

  const data = useMemo(() => {
    const filteredCountries = countryCodes.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const selectedItem = filteredCountries.find(
      item => item.code === countryCode,
    );
    const otherItems = filteredCountries.filter(
      item => item.code !== countryCode,
    );
    return selectedItem ? [selectedItem, ...otherItems] : otherItems;
  }, [countryCode, searchQuery]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? headerHeight : headerHeight + 20
      }
    >
      <View style={styles.searchContainer}>
        <InputText
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          itemLeft={
            <View style={styles.searchIconContainer}>
              <Search color={theme.colors.contentTertiary} />
            </View>
          }
        />
      </View>
      <Divider style={styles.searchDivider} />
      <FlatList
        style={styles.list}
        data={data}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => (
          <>
            <ListItem
              onPress={handlePressItem(item)}
              text={item.name}
              itemLeft={
                <View style={styles.flagContainer}>
                  <Avatar source={{ uri: item.flagUrl }} size="small" />
                </View>
              }
              itemRight={
                countryCode === item.code ? (
                  <CheckLarge color={theme.colors.contentPrimary} />
                ) : undefined
              }
              style={styles.listItem}
            />
            {index !== data.length - 1 && <Divider style={styles.divider} />}
          </>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
    backgroundColor: theme.colors.backgroundElevated,
  },
  searchDivider: {
    borderBottomColor: theme.colors.borderNeutralSecondary,
  },
  searchIconContainer: {
    marginRight: theme.spacing.small,
  },
  searchInput: {
    marginBottom: 0,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  listItem: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.large,
  },
  flagContainer: {
    marginRight: theme.spacing.medium,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderNeutralSecondary,
    marginLeft: theme.spacing.large + FLAG_SIZE + theme.spacing.medium,
  },
}));
