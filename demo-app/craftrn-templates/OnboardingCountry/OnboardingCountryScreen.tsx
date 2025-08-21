import { InputText } from '@/craftrn-ui/components/InputText';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import { Search } from '@/tetrisly-icons/Search';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
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
  const { styles, theme } = useStyles(stylesheet);
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
          leftAccessory={
            <View style={styles.searchIconContainer}>
              <Search color={theme.colors.contentQuaternary} />
            </View>
          }
        />
      </View>
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
                <Image
                  source={{ uri: item.flagUrl }}
                  style={styles.flagImage}
                />
              }
              itemRight={
                countryCode === item.code ? (
                  <CheckLarge color={theme.colors.contentPrimary} />
                ) : undefined
              }
              style={styles.listItem}
            />
            {index !== data.length - 1 && <View style={styles.divider} />}
          </>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderPrimary,
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
  flagImage: {
    width: FLAG_SIZE,
    height: FLAG_SIZE,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.medium,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderPrimary,
    marginLeft: theme.spacing.large + FLAG_SIZE + theme.spacing.medium,
  },
}));
