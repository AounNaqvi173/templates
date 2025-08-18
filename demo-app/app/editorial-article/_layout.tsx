import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { NavigationBackButton } from '../../components/NavigationBackButton';

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
              <NavigationBackButton onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
