import aiConversationDark from '@/assets/images/screens/ai-conversation-dark.png';
import aiConversationLight from '@/assets/images/screens/ai-conversation-light.png';
import editorialArticleDark from '@/assets/images/screens/editorial-article-dark.png';
import editorialArticleLight from '@/assets/images/screens/editorial-article-light.png';
import editorialFeedDark from '@/assets/images/screens/editorial-feed-dark.png';
import editorialFeedLight from '@/assets/images/screens/editorial-feed-light.png';
import messagingInboxDark from '@/assets/images/screens/messaging-inbox-dark.png';
import messagingInboxLight from '@/assets/images/screens/messaging-inbox-light.png';
import messagingThreadDark from '@/assets/images/screens/messaging-thread-dark.png';
import messagingThreadLight from '@/assets/images/screens/messaging-thread-light.png';
import notificationsDark from '@/assets/images/screens/notifications-dark.png';
import notificationsLight from '@/assets/images/screens/notifications-light.png';
import onboardingCountryDark from '@/assets/images/screens/onboarding-country-dark.png';
import onboardingCountryLight from '@/assets/images/screens/onboarding-country-light.png';
import onboardingCreatePasscodeDark from '@/assets/images/screens/onboarding-create-passcode-dark.png';
import onboardingCreatePasscodeLight from '@/assets/images/screens/onboarding-create-passcode-light.png';
import onboardingOneTimeCodeDark from '@/assets/images/screens/onboarding-one-time-code-dark.png';
import onboardingOneTimeCodeLight from '@/assets/images/screens/onboarding-one-time-code-light.png';
import onboardingSignUpDark from '@/assets/images/screens/onboarding-sign-up-dark.png';
import onboardingSignUpLight from '@/assets/images/screens/onboarding-sign-up-light.png';
import paywallSubscriptionDark from '@/assets/images/screens/paywall-subscription-dark.png';
import paywallSubscriptionLight from '@/assets/images/screens/paywall-subscription-light.png';
import profileDark from '@/assets/images/screens/profile-dark.png';
import profileLight from '@/assets/images/screens/profile-light.png';
import settingsDark from '@/assets/images/screens/settings-dark.png';
import settingsLight from '@/assets/images/screens/settings-light.png';
import staysDetailsDark from '@/assets/images/screens/stays-details-dark.png';
import staysDetailsLight from '@/assets/images/screens/stays-details-light.png';
import staysFiltersDark from '@/assets/images/screens/stays-filters-dark.png';
import staysFiltersLight from '@/assets/images/screens/stays-filters-light.png';
import staysSearchDark from '@/assets/images/screens/stays-search-dark.png';
import staysSearchLight from '@/assets/images/screens/stays-search-light.png';
import staysSelectionDark from '@/assets/images/screens/stays-selection-dark.png';
import staysSelectionLight from '@/assets/images/screens/stays-selection-light.png';
import tradingDashboardDark from '@/assets/images/screens/trading-dashboard-dark.png';
import tradingDashboardLight from '@/assets/images/screens/trading-dashboard-light.png';
import tradingOrderDark from '@/assets/images/screens/trading-order-dark.png';
import tradingOrderLight from '@/assets/images/screens/trading-order-light.png';
import ParallaxScrollView from '@/components/ParallaxScrollView/ParallaxScrollView';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import { Settings } from '@/tetrisly-icons/Settings';
import { Href, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ComponentType } from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';

export const MenuItem: ComponentType<{
  title: string;
  href: Href;
  imageSource: number;
  description: string;
}> = ({ title, href, imageSource, description }) => {
  const router = useRouter();

  return (
    <Card>
      <Pressable onPress={() => router.push(href)} style={styles.menuItem}>
        <Image source={imageSource} style={styles.menuItemImage} />
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemText}>{title}</Text>
          {description && (
            <Text style={styles.menuItemTextBelow}>{description}</Text>
          )}
        </View>
      </Pressable>
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
  const colorScheme = useColorScheme();
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <ParallaxScrollView title="Templates">
        <View style={styles.scrollViewContent}>
          <MenuItem
            title="AI Conversation"
            description="Chat interface inspired by AI assistant apps with clean design and modern messaging."
            href="/ai-conversation/a7b8c9d0-e1f2-3456-abcd-789012345678"
            imageSource={
              colorScheme === 'light' ? aiConversationLight : aiConversationDark
            }
          />
          <MenuItem
            title="Editorial article"
            description="A detailed article view with rich content and related readings."
            href="/editorial-article/16d48496-00b0-4270-854d-94393828952a"
            imageSource={
              colorScheme === 'light'
                ? editorialArticleLight
                : editorialArticleDark
            }
          />
          <MenuItem
            title="Editorial feed"
            description="A feed of editorial content, perfect for news or blog layouts."
            href="/editorial-feed"
            imageSource={
              colorScheme === 'light' ? editorialFeedLight : editorialFeedDark
            }
          />
          <MenuItem
            title="Messaging inbox"
            description="An inbox for managing messages and conversations."
            href="/messaging-inbox"
            imageSource={
              colorScheme === 'light' ? messagingInboxLight : messagingInboxDark
            }
          />
          <MenuItem
            title="Messaging thread"
            description="A detailed view of a single messaging thread."
            href="/messaging-thread/7d3463b7-9acd-4ee3-8d0e-3c28fab32945"
            imageSource={
              colorScheme === 'light'
                ? messagingThreadLight
                : messagingThreadDark
            }
          />
          <MenuItem
            title="Notifications"
            description="Display and manage user notifications."
            href="/notifications"
            imageSource={
              colorScheme === 'light' ? notificationsLight : notificationsDark
            }
          />
          <MenuItem
            title="Onboarding country"
            description="Select your country during the onboarding process."
            href="/onboarding-country?countryCode=FR"
            imageSource={
              colorScheme === 'light'
                ? onboardingCountryLight
                : onboardingCountryDark
            }
          />
          <MenuItem
            title="Onboarding create passcode"
            description="Set up a secure passcode for your account."
            href="/onboarding-create-passcode"
            imageSource={
              colorScheme === 'light'
                ? onboardingCreatePasscodeLight
                : onboardingCreatePasscodeDark
            }
          />
          <MenuItem
            title="Onboarding one time code"
            description="Enter a one-time code for verification."
            href="/onboarding-one-time-code"
            imageSource={
              colorScheme === 'light'
                ? onboardingOneTimeCodeLight
                : onboardingOneTimeCodeDark
            }
          />
          <MenuItem
            title="Onboarding sign up"
            description="User registration and sign-up flow."
            href="/onboarding-sign-up"
            imageSource={
              colorScheme === 'light'
                ? onboardingSignUpLight
                : onboardingSignUpDark
            }
          />
          <MenuItem
            title="Paywall subscription"
            description="Manage and subscribe to premium content."
            href="/paywall-subscription"
            imageSource={
              colorScheme === 'light'
                ? paywallSubscriptionLight
                : paywallSubscriptionDark
            }
          />
          <MenuItem
            title="Profile"
            description="View and edit user profile information."
            href="/profile"
            imageSource={colorScheme === 'light' ? profileLight : profileDark}
          />
          <MenuItem
            title="Settings"
            description="Configure application settings and preferences."
            href="/settings"
            imageSource={colorScheme === 'light' ? settingsLight : settingsDark}
          />
          <MenuItem
            title="Stays details"
            description="Detailed information about a specific stay or accommodation."
            href="/stays-details/f7a97e34-1b6f-4f5c-ae16-d7c28f1de169"
            imageSource={
              colorScheme === 'light' ? staysDetailsLight : staysDetailsDark
            }
          />
          <MenuItem
            title="Stays filters"
            description="Apply filters to refine your search for stays."
            href="/stays-filters"
            imageSource={
              colorScheme === 'light' ? staysFiltersLight : staysFiltersDark
            }
          />
          <MenuItem
            title="Stays search"
            description="Search for available stays and accommodations."
            href="/stays-search"
            imageSource={
              colorScheme === 'light' ? staysSearchLight : staysSearchDark
            }
          />
          <MenuItem
            title="Stays selection"
            description="Select and manage your chosen stays."
            href="/stays-selection"
            imageSource={
              colorScheme === 'light' ? staysSelectionLight : staysSelectionDark
            }
          />
          <MenuItem
            title="Trading dashboard"
            description="Monitor and manage your trading activities."
            href="/trading-dashboard"
            imageSource={
              colorScheme === 'light'
                ? tradingDashboardLight
                : tradingDashboardDark
            }
          />
          <MenuItem
            title="Trading order"
            description="Place and manage your trading orders."
            href="/trading-order/3e458e61-677c-4d55-b908-507a490a4853"
            imageSource={
              colorScheme === 'light' ? tradingOrderLight : tradingOrderDark
            }
          />

          <View style={styles.themeButtonContainer}>
            <Card>
              <ListItem
                text="Change theme in Settings"
                textBelow={`${colorScheme === 'dark' ? 'Dark' : 'Light'} mode enabled`}
                style={styles.listItem}
                itemLeft={
                  <View style={styles.themeIconContainer}>
                    <Settings color={theme.colors.contentPrimary} />
                  </View>
                }
                itemRight={<ChevronRight color={theme.colors.contentPrimary} />}
                onPress={openDeviceSettings}
              />
            </Card>
          </View>
        </View>
      </ParallaxScrollView>

      <View style={styles.fixedBottomContainer}>
        <Card>
          <ListItem
            text="Get all templates"
            textBelow="Access GitHub resources now"
            style={styles.listItem}
            itemRight={<ChevronRight color={theme.colors.contentPrimary} />}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://www.craftreactnative.com/pricing',
                {
                  controlsColor: theme.colors.accentPrimary,
                  presentationStyle:
                    WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
                },
              )
            }
          />
        </Card>
      </View>
    </View>
  );
}
const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: UnistylesRuntime.insets.bottom,
    gap: 8,
  },
  listItem: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.surfacePrimary,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
    backgroundColor: theme.colors.surfaceTertiary,
  },
  menuItemContent: {
    flex: 1,
    marginHorizontal: theme.spacing.small,
    gap: theme.spacing.small,
    justifyContent: 'flex-start',
    padding: theme.spacing.medium,
  },
  menuItemText: {
    ...theme.textVariants.body1,
    fontWeight: 'bold',
    color: theme.colors.contentPrimary,
  },
  menuItemTextBelow: {
    ...theme.textVariants.body2,
    color: theme.colors.contentSecondary,
  },
  themeIconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.small,
  },
  fixedBottomContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingBottom: UnistylesRuntime.insets.bottom + 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  themeButtonContainer: {
    marginTop: theme.spacing.small,
  },
  menuItemImage: {
    width: 120,
    aspectRatio: 0.46,
    borderRadius: 6,
  },
}));
