import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function ListingsLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerStyle: { backgroundColor: theme.colors.backgroundElevated },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerShadowVisible: false,
          headerTintColor: theme.colors.contentPrimary,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="neutral" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
