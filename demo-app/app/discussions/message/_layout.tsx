import { NavigationBackButton } from '@/components/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function MessageLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Message',
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="secondary" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
