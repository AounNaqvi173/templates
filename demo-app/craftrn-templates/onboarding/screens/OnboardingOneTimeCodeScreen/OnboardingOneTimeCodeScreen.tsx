import { Button } from '@/craftrn-ui/components/Button';
import { Text } from '@/craftrn-ui/components/Text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AnimatedKeyboardView } from '../../components/AnimatedKeyboardView';
import { OneTimeCodeInput } from './OneTimeCodeInput';

export const OnboardingOneTimeCodeScreen: ComponentType = () => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phoneNumber } = useLocalSearchParams<{
    phoneNumber?: string;
  }>();

  return (
    <AnimatedKeyboardView
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="heading3">Confirm your phone number</Text>
          <Text variant="body3" color="contentSecondary">
            Enter the 6-digit verification code that has been sent to{' '}
            {phoneNumber}.
          </Text>
        </View>
        <View style={styles.codeInput}>
          <OneTimeCodeInput onChangeCode={() => {}} />
        </View>
        <View style={styles.footer}>
          <Text variant="body3">
            Haven't received an SMS?{' '}
            <Text
              onPress={() => {}}
              variant="body3"
              color="contentAccent"
              style={styles.footerTextLink}
            >
              Send again
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push('onboarding/create-passcode')}>
          Continue
        </Button>
      </View>
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
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
  codeInput: {
    flexDirection: 'row',
    gap: theme.spacing.xsmall,
  },
  footer: {
    gap: theme.spacing.xsmall,
  },
  footerTextLink: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
}));
