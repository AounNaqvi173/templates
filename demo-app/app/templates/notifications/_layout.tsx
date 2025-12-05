import { Stack } from 'expo-router';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function NotificationsLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Notifications',
          contentStyle: {
            backgroundColor: theme.colors.backgroundScreenSecondary,
          },
          headerStyle: { backgroundColor: theme.colors.backgroundElevated },
          headerTintColor: theme.colors.contentPrimary,
          headerShadowVisible: false,
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
