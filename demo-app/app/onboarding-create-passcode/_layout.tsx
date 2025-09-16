import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

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
          headerStyle: { backgroundColor: theme.colors.backgroundSecondary },
          contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
