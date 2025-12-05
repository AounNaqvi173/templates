import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function TradingOrderLayout() {
  const router = useRouter();
  const { theme } = useUnistyles();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerTintColor: theme.colors.contentPrimary,
          headerShadowVisible: false,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="neutral" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
