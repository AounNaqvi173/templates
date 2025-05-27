import { NavigationBackButton } from '@/components/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export default function DetailsLayout() {
  const { theme } = useStyles();
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
                : theme.colors.backgroundPrimary,
          },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="primary" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
