import React, { ComponentType } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { PersonalInformation } from './PersonalInformation';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSettings } from './ProfileSettings';
import { ProfileStats } from './ProfileStats';

export const ProfileScreen: ComponentType = () => {
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

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
}));
