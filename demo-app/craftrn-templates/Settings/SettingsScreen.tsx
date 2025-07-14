import React, { ComponentType } from 'react';
import { ScrollView } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { MarketingBanner } from './MarketingBanner';
import { NotificationsFrequency } from './NotificationsFrequency';
import { PrivacySection } from './PrivacySection';
import { ProfileSection } from './ProfileSection';
import { PushNotificationsSection } from './PushNotificationsSection';
import { SecuritySection } from './SecuritySection';

type Props = {
  onPressProfile: VoidFunction;
};

export const SettingsScreen: ComponentType<Props> = ({ onPressProfile }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <ProfileSection onPress={onPressProfile} />
      <MarketingBanner />
      <PushNotificationsSection />
      <NotificationsFrequency />
      <SecuritySection />
      <PrivacySection />
    </ScrollView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    marginTop: theme.spacing.medium,
  },
  scrollContent: {
    gap: theme.spacing.small,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
}));
