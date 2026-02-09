import { PasscodeEntry } from '@/craftrn-ui/components/PasscodeEntry';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

export const OnboardingCreatePasscodeScreen: ComponentType = () => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="heading3">Create a passcode</Text>
          <Text variant="body3" color="contentSecondary">
            This passcode will be used to access your account.
          </Text>
        </View>
        <PasscodeEntry onPasscodeEntered={() => {}} />
        <View style={styles.footer}>
          <Text variant="body3" style={styles.footerText}>
            By creating a passcode, you agree with our{'\n'}
            <Text
              onPress={() => {}}
              variant="body3"
              color="contentAccent"
              style={styles.footerTextLink}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.xlarge,
  },
  header: {
    gap: theme.spacing.xsmall,
    marginVertical: theme.spacing.medium,
  },
  footer: {
    paddingHorizontal: theme.spacing.large,
    marginBottom: UnistylesRuntime.insets.bottom + theme.spacing.large,
  },
  footerText: {
    color: theme.colors.contentSecondary,
    textAlign: 'center',
  },
  footerTextLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
}));
