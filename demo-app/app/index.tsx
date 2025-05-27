import ParallaxScrollView from '@/components/ParallaxScrollView/ParallaxScrollView';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import { Settings } from '@/tetrisly-icons/Settings';
import { Href, useRouter } from 'expo-router';
import { ComponentType } from 'react';
import { Linking, Platform, View } from 'react-native';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const MenuItem: ComponentType<{
  title: string;
  href: Href;
}> = ({ title, href }) => {
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();

  return (
    <Card>
      <ListItem
        text={title}
        style={styles.listItem}
        itemRight={<ChevronRight color={theme.colors.contentPrimary} />}
        onPress={() => router.push(href)}
      />
    </Card>
  );
};

const openDeviceSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:root=DISPLAY');
  } else if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.DISPLAY_SETTINGS', []);
  }
};

export default function HomeScreen() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ParallaxScrollView title="Templates">
      <View style={styles.scrollViewContent}>
        <MenuItem title="Discussions" href="/discussions" />
        <MenuItem title="Listings" href="/listings" />
        <MenuItem title="Notifications" href="/notifications" />
        <MenuItem title="Onboarding" href="/onboarding" />
        <MenuItem title="Paywall" href="/paywall" />
        <MenuItem title="Publishing" href="/publishing" />
        <MenuItem title="Trading" href="/trading" />
        <MenuItem title="Settings" href="/settings" />

        <View style={styles.themeButtonContainer}>
          <Card>
            <ListItem
              text="Change theme"
              style={styles.listItem}
              itemLeft={
                <View style={styles.themeIconContainer}>
                  <Settings color={theme.colors.contentPrimary} />
                </View>
              }
              onPress={openDeviceSettings}
            />
          </Card>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
const stylesheet = createStyleSheet(({ colors, spacing }) => ({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
    gap: spacing.small,
  },
  listItem: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.large,
  },
  themeIconContainer: {
    marginRight: spacing.small,
  },
  themeButtonContainer: {
    marginTop: spacing.large,
  },
}));
