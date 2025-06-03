import { Button } from '@/craftrn-ui/components/Button';
import { InputText } from '@/craftrn-ui/components/InputText';
import { Text } from '@/craftrn-ui/components/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentType, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { countryCodes } from '../../data/countryCodes';
import { ButtonApple } from './ButtonApple/ButtonApple';
import { ButtonGoogle } from './ButtonGoogle/ButtonGoogle';

export const OnboardingLandingScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const { countryCode = 'FR' } = useLocalSearchParams<{
    countryCode?: string;
  }>();

  const selectedCountryCode =
    countryCodes[
      countryCodes.findIndex(country => country.code === countryCode)
    ];

  return (
    <ScrollView
      style={styles.scrollView}
      alwaysBounceVertical={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="heading3">Log in or sign up</Text>
          <Text variant="body3" color="contentSecondary">
            You will receive a code to confirm your phone number.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <InputText
            label="Country/region"
            value={selectedCountryCode.name}
            readOnly={true}
            onPress={() =>
              router.push({
                pathname: '/onboarding/country-code',
                params: { countryCode },
              })
            }
            rightAccessory={<ChevronDown color={theme.colors.contentPrimary} />}
          />
          <InputText
            label="Phone number"
            keyboardType="number-pad"
            onChangeText={setPhoneNumber}
          />
          <Button
            onPress={() =>
              router.push({
                pathname: '/onboarding/one-time-code',
                params: { phoneNumber: phoneNumber ?? '' },
              })
            }
          >
            Continue
          </Button>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerTextContainer}>
            <Text
              variant="body3"
              color="contentTertiary"
              style={styles.dividerText}
            >
              or
            </Text>
          </View>
        </View>
        <View style={styles.socialButtonsContainer}>
          <ButtonGoogle onPress={() => null} />
          <ButtonApple onPress={() => null} />
        </View>
      </View>
    </ScrollView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.xlarge,
  },
  header: {
    gap: theme.spacing.xsmall,
    marginVertical: theme.spacing.medium,
  },
  inputContainer: {
    gap: theme.spacing.small,
  },
  dividerContainer: {
    marginVertical: theme.spacing.xxlarge,
    position: 'relative',
  },
  dividerLine: {
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
  },
  dividerTextContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.backgroundSecondary,
    top: -theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
    alignSelf: 'center',
  },
  dividerText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    gap: theme.spacing.medium,
  },
}));
