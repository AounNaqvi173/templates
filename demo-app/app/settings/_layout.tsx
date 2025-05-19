import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function SettingsLayout() {
  const { theme } = useStyles();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        contentStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        headerShadowVisible: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <NavigationBackButton onPress={router.back} variant="secondary" />
          ) : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          title: 'Security',
        }}
      />
    </Stack>
  );
}
