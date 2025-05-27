import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function DiscussionsLayout() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Discussions',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: theme.colors.contentPrimary,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="message"
        options={{
          title: 'Message',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
