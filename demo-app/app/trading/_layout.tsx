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
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <NavigationBackButton onPress={router.back} variant="secondary" />
          ) : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="invest"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
