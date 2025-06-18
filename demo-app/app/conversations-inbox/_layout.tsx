import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function ConversationsInboxLayout() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerStyle: { backgroundColor: theme.colors.backgroundPrimary },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: theme.colors.contentPrimary,
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerSearchBarOptions: {
            placeholder: 'Search',
            hideWhenScrolling: true,
            barTintColor: theme.colors.surfacePrimary,
            textColor: theme.colors.contentSecondary,
          },
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
