import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function OnboardingSignUp() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.colors.backgroundSecondary },
          contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
