import { NavigationBackButton } from '@/components/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function DetailsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
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
