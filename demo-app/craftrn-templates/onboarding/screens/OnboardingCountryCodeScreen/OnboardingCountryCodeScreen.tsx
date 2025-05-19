import { ListItem } from '@/craftrn-ui/components/ListItem';
import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { FlatList, Platform } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { countryCodes } from '../../data/countryCodes';

const modalCardTopOffset = Platform.select({
  ios: 10, // This value is a constant for all types of iOS devices
  default: 0,
});

const useModalCardHeaderHeight = () => {
  const headerHeight = useHeaderHeight();
  return UnistylesRuntime.insets.top + modalCardTopOffset + headerHeight;
};

export const OnboardingCountryCodeScreen: ComponentType = () => {
  const { countryCode = 'FR' } = useLocalSearchParams<{
    countryCode?: string;
  }>();
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);
  const headerHeight = useModalCardHeaderHeight();

  const handlePressItem = useCallback(
    (item: (typeof countryCodes)[number]) => () => {
      router.dismissTo({
        pathname: '/onboarding',
        params: { countryCode: item.code },
      });
    },
    [router],
  );

  const data = useMemo(() => {
    const selectedItem = countryCodes.find(item => item.code === countryCode);
    const otherItems = countryCodes.filter(item => item.code !== countryCode);
    return selectedItem ? [selectedItem, ...otherItems] : otherItems;
  }, [countryCode]);

  return (
    <FlatList
      style={styles.container}
      data={data}
      contentContainerStyle={styles.contentContainer({ headerHeight })}
      renderItem={({ item, index }) => (
        <ListItem
          onPress={handlePressItem(item)}
          text={item.name}
          itemRight={
            countryCode === item.code ? (
              <CheckLarge color={theme.colors.contentPrimary} />
            ) : undefined
          }
          divider={index !== data.length - 1}
          style={styles.listItem}
        />
      )}
    />
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  contentContainer: ({ headerHeight }) => ({
    paddingBottom: headerHeight,
  }),
  listItem: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.large,
  },
}));
