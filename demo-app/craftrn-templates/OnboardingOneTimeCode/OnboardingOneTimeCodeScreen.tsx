import { Button } from '@/craftrn-ui/components/Button';
import { InputOTP } from '@/craftrn-ui/components/InputOTP';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AnimatedKeyboardView } from './AnimatedKeyboardView';

type Props = {
  phoneNumber?: string;
  onPressContinue: VoidFunction;
};

export const OnboardingOneTimeCodeScreen: ComponentType<Props> = ({
  phoneNumber,
  onPressContinue,
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <AnimatedKeyboardView style={[styles.container]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="heading3">Confirm your phone number</Text>
          <Text variant="body3" color="contentSecondary">
            Enter the 6-digit verification code that has been sent to{' '}
            {phoneNumber}.
          </Text>
        </View>
        <View style={styles.codeInput}>
          <InputOTP onChange={() => {}} />
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
        <Button onPress={onPressContinue}>Continue</Button>
      </View>
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingBottom: UnistylesRuntime.insets.bottom,
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
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
}));
