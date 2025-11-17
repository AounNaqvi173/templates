import React, { ComponentType } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { PersonalInformation } from './PersonalInformation';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSettings } from './ProfileSettings';
import { ProfileStats } from './ProfileStats';

export const ProfileScreen: ComponentType = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bottomOffset={24}
    >
      <ProfileAvatar />
      <ProfileStats />
      <PersonalInformation />
      <ProfileSettings />
    </KeyboardAwareScrollView>
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
