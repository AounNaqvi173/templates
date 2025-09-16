import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function ProfileLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
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
        }}
      />
    </Stack>
  );
}
