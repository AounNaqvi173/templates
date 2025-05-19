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
          title: 'Notifications',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
