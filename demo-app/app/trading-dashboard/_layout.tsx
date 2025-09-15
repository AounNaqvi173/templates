import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function TradingLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        contentStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: undefined,
        }}
      />
    </Stack>
  );
}
