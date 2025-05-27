import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';
import { NavigationBackButton } from '../../components/NavigationBackButton';

export default function TradingLayout() {
  const { theme } = useStyles();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        contentStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <NavigationBackButton onPress={router.back} variant="secondary" />
          ) : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="invest"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
