import ParallaxScrollView from '@/components/ParallaxScrollView/ParallaxScrollView';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import { Href, useRouter } from 'expo-router';
import { ComponentType } from 'react';
import { View } from 'react-native';
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

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

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
}));
