import { SettingsEditProfileScreen } from '@/craftrn-templates/settings/screens/SettingsEditProfile';
import { Stack } from 'expo-router';
import React from 'react';

export default function EditProfilePage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerBackTitle: 'Settings',
        }}
      />
      <SettingsEditProfileScreen />
    </>
  );
}
