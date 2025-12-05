import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function StaysDetailsLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              Platform.OS === 'ios'
                ? 'transparent'
                : theme.colors.backgroundScreenSecondary,
          },
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="neutral" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
