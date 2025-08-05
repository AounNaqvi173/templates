import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function AiConversationLayout() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerBlurEffect: 'regular',
          headerTransparent: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
          },
          contentStyle: { backgroundColor: theme.colors.backgroundPrimary },
          headerTintColor: theme.colors.contentPrimary,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
