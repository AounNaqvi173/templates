import { NavigationBackButton } from '@/components/NavigationBackButton/NavigationBackButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function EditorialArticleLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          contentStyle: { backgroundColor: theme.colors.backgroundScreen },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton variant="neutral" onPress={router.back} />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
