import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function MessagingInboxLayout() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: `${theme.colors.backgroundSecondary}55`,
          },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: theme.colors.contentPrimary,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
          },
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
