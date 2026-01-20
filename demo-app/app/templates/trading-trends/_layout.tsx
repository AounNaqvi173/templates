import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function TradingTrendsLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Market trends',
        statusBarTranslucent: true,
        contentStyle: {
          backgroundColor: theme.colors.backgroundScreen,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: undefined,
          headerStyle: {
            backgroundColor: theme.colors.backgroundScreen,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
