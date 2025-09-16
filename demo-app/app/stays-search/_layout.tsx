import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function ListingsLayout() {
  const { theme } = useUnistyles();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerShadowVisible: false,
          headerTintColor: theme.colors.contentPrimary,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <NavigationBackButton onPress={router.back} intent="secondary" />
            ) : undefined,
        }}
      />
    </Stack>
  );
}
