import { PasscodeEntry } from '@/craftrn-ui/components/PasscodeEntry';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType } from 'react';
import { SafeAreaView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const OnboardingCreatePasscodeScreen: ComponentType = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="heading3">Create a PIN</Text>
          <Text variant="body3" color="contentSecondary">
            This PIN will be used to access your account.
          </Text>
        </View>
        <PasscodeEntry onPasscodeEntered={() => {}} />
      </View>
    </SafeAreaView>
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
}));
