import { Button } from '@/craftrn-ui/components/Button';
import { InputText } from '@/craftrn-ui/components/InputText';
import { Text } from '@/craftrn-ui/components/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import React, { ComponentType, useCallback, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { ButtonApple } from './ButtonApple/ButtonApple';
import { ButtonGoogle } from './ButtonGoogle/ButtonGoogle';
import { countryCodes } from './data/countryCodes';

type CountryCode = (typeof countryCodes)[number]['code'];

type Props = {
  countryCode: CountryCode;
  onPressCountry: (countryCode: CountryCode) => void;
  onPressContinue: (phoneNumber: string) => void;
};

export const OnboardingSignUpScreen: ComponentType<Props> = ({
  countryCode,
  onPressCountry,
  onPressContinue,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePressCountry = useCallback(
    (countryCode: CountryCode) => () => {
      onPressCountry(countryCode);
    },
    [onPressCountry],
  );

  const handlePressContinue = useCallback(() => {
    onPressContinue(phoneNumber);
  }, [onPressContinue, phoneNumber]);

  const selectedCountryCode =
    countryCodes[
      countryCodes.findIndex(country => country.code === countryCode)
    ];

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Svg style={styles.gradientOverlay}>
          <Defs>
            <LinearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop
                offset="0"
                stopColor={theme.colors.backgroundSecondary}
                stopOpacity="0"
              />
              <Stop
                offset="1"
                stopColor={theme.colors.backgroundSecondary}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#fadeGradient)" />
        </Svg>
      </ImageBackground>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text variant="heading2" style={styles.header}>
              Login or sign up
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputText
              label="Country/region"
              value={selectedCountryCode.name}
              readOnly={true}
              onPress={handlePressCountry(selectedCountryCode.code)}
              rightAccessory={
                <ChevronDown color={theme.colors.contentPrimary} />
              }
            />
            <InputText
              label="Phone number"
              keyboardType="number-pad"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            <Text variant="body3" color="contentSecondary">
              You will receive a code to confirm your phone number.
            </Text>
            <View style={styles.ctaContainer}>
              <Button onPress={handlePressContinue}>Continue</Button>
            </View>
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
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flexShrink: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: UnistylesRuntime.insets.bottom + theme.spacing.xlarge,
  },
  spacer: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.xlarge,
    marginBottom: theme.spacing.xxlarge,
  },
  headerContainer: {
    gap: theme.spacing.xsmall,
    marginVertical: theme.spacing.medium,
  },
  header: {
    textAlign: 'center',
  },
  inputContainer: {
    gap: theme.spacing.small,
  },
  ctaContainer: {
    marginTop: theme.spacing.xlarge,
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
