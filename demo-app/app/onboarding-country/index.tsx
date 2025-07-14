import {
  OnboardingCountryScreen,
  Props,
} from '@/craftrn-templates/OnboardingCountry/OnboardingCountryScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function OnboardingCountry() {
  const router = useRouter();
  const { countryCode } = useLocalSearchParams<{
    countryCode?: Props['countryCode'];
  }>();

  const handlePressCountry = (countryCode: Props['countryCode']) => {
    router.navigate(`/onboarding-sign-up?countryCode=${countryCode}`);
  };

  return (
    <OnboardingCountryScreen
      countryCode={countryCode}
      onPressCountryCode={handlePressCountry}
    />
  );
}
