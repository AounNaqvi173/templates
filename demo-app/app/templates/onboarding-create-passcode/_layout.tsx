import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function OnboardingCreatePasscodeLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.colors.backgroundElevated },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton variant="neutral" onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
