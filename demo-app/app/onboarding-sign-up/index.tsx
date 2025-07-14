import { OnboardingSignUpScreen } from '@/craftrn-templates/OnboardingSignUp/OnboardingSignUpScreen';
import { useRouter } from 'expo-router';

export default function OnboardingSignUp() {
  const router = useRouter();

  return (
    <OnboardingSignUpScreen
      countryCode="FR"
      onPressCountry={countryCode => {
        router.push(`/onboarding-country?countryCode=${countryCode}`);
      }}
      onPressContinue={phoneNumber => {
        router.push(`/onboarding-one-time-code?phoneNumber=${phoneNumber}`);
      }}
    />
  );
}
