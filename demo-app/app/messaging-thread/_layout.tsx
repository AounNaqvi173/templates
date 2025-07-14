import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function MessagingThreadLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} variant="secondary" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
