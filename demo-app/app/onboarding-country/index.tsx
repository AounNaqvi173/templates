import {
  CountryCode,
  OnboardingCountryScreen,
} from '@/craftrn-templates/OnboardingCountry/OnboardingCountryScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function OnboardingCountry() {
  const router = useRouter();
  const { countryCode } = useLocalSearchParams<{
    countryCode?: CountryCode;
  }>();

  const handlePressCountry = (countryCode: CountryCode) => {
    const route = `/onboarding-sign-up?countryCode=${countryCode}` as const;
    try {
      router.dismissTo(route);
    } catch {
      router.push(route);
    }
  };

  return (
    <OnboardingCountryScreen
      countryCode={countryCode}
      onPressCountryCode={handlePressCountry}
    />
  );
}
