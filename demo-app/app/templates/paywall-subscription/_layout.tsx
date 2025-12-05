import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function PaywallSubscriptionLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreen,
          },
        }}
      />
    </Stack>
  );
}
