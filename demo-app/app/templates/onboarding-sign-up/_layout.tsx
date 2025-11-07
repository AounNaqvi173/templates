import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function OnboardingSignUp() {
  const { theme } = useUnistyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.colors.backgroundElevated },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
