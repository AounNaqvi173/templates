import { NavigationBackButton } from '@/components/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function DiscussionsLayout() {
  const { theme } = useStyles();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.backgroundSecondary },
        contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <NavigationBackButton onPress={router.back} variant="secondary" />
          ) : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="country-code"
        options={{
          presentation: 'modal',
          headerTitle: 'Country/region',
          headerShadowVisible: true,
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
