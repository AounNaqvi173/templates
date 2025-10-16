import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export default function MessagingInboxLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerBlurEffect: 'regular',
          headerTransparent: Platform.OS === 'ios',
          headerShadowVisible: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor:
              Platform.OS === 'ios'
                ? `${theme.colors.backgroundSecondary}55`
                : theme.colors.backgroundPrimary,
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
