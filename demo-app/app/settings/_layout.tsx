import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function SettingsLayout() {
  const { theme } = useStyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundSecondary,
          },
          contentStyle: {
            backgroundColor: theme.colors.backgroundSecondary,
          },
          headerTintColor: theme.colors.contentPrimary,
          headerShadowVisible: false,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} />
            ) : undefined,
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
