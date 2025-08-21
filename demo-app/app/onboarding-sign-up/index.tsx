import {
  CountryCode,
  OnboardingSignUpScreen,
} from '@/craftrn-templates/OnboardingSignUp/OnboardingSignUpScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function OnboardingSignUp() {
  const router = useRouter();
  const { countryCode } = useLocalSearchParams<{ countryCode: CountryCode }>();

  return (
    <OnboardingSignUpScreen
      countryCode={countryCode}
      onPressCountry={countryCode => {
        router.push(`/onboarding-country?countryCode=${countryCode}`);
      }}
      onPressContinue={phoneNumber => {
        router.push(`/onboarding-one-time-code?phoneNumber=${phoneNumber}`);
      }}
    />
  );
}
