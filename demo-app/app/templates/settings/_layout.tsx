import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function SettingsLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundScreen,
          },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreen,
          },
          headerTintColor: theme.colors.contentPrimary,
          headerShadowVisible: false,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton
                variant="neutral-secondary"
                onPress={router.back}
              />
            ) : undefined,
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
