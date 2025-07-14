import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

export default function StaysSelectionLayout() {
  const { theme } = useStyles();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
          headerShown: false,
          headerLeft: () => null,
        }}
      />
    </Stack>
  );
}
