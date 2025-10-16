import { SettingsScreen } from '@/craftrn-templates/Settings/SettingsScreen';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function SettingsMain() {
  const router = useRouter();
  const handlePressProfile = useCallback(() => {
    router.navigate('/templates/profile');
  }, [router]);

  return <SettingsScreen onPressProfile={handlePressProfile} />;
}
