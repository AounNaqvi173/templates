import { NavigationBackButton } from '@/components/NavigationBackButton';
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
            backgroundColor: theme.colors.backgroundPrimary,
          },
          contentStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
          },
          headerTintColor: theme.colors.contentPrimary,
          headerShadowVisible: false,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} intent="secondary" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
