import React, { ComponentType } from 'react';
import { ScrollView } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { PersonalInformation } from './PersonalInformation';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSettings } from './ProfileSettings';
import { ProfileStats } from './ProfileStats';

export const ProfileScreen: ComponentType = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <ProfileAvatar />
      <ProfileStats />
      <PersonalInformation />
      <ProfileSettings />
    </ScrollView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  scrollContent: {
    gap: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
}));
