import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function ListingsLayout() {
  const { theme } = useStyles();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.contentPrimary,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <NavigationBackButton onPress={router.back} />
          ) : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="filters"
        options={{
          title: 'Filters',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Search',
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
