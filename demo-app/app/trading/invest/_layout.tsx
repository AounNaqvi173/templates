import { NavigationBackButton } from '@/components/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function InvestLayout() {
  const router = useRouter();
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Invest',
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
              <NavigationBackButton onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
