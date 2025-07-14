import { OnboardingOneTimeCodeScreen } from '@/craftrn-templates/OnboardingOneTimeCode/OnboardingOneTimeCodeScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function OnboardingOneTimeCode() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{
    phoneNumber?: string;
  }>();
  const handlePressContinue = () => {
    router.navigate('/onboarding-create-passcode');
  };

  return (
    <OnboardingOneTimeCodeScreen
      phoneNumber={phoneNumber}
      onPressContinue={handlePressContinue}
    />
  );
}
