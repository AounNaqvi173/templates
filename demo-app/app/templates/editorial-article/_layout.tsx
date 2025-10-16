import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function EditorialArticleLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton intent="secondary" onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
