import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import React, { useState } from 'react';
import { useUnistyles } from 'react-native-unistyles';
import { SectionHeader } from './SectionHeader';
import { SettingsItem } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

type NotificationType = 'all' | 'messages-mentions' | 'messages';

export const NotificationsFrequency = () => {
  const { theme } = useUnistyles();
  const [notificationType, setNotificationType] =
    useState<NotificationType>('all');

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <>
      <SectionHeader>Notify me about</SectionHeader>
      <SettingsSection>
        <SettingsItem
          onPress={() => setNotificationType('all')}
          text="All new messages"
          itemRight={
            notificationType === 'all' ? (
              <CheckLarge {...iconProps} />
            ) : undefined
          }
        />
        <SettingsItem
          onPress={() => setNotificationType('messages-mentions')}
          text="Direct messages and mentions"
          itemRight={
            notificationType === 'messages-mentions' ? (
              <CheckLarge {...iconProps} />
            ) : undefined
          }
        />
        <SettingsItem
          onPress={() => setNotificationType('messages')}
          text="Direct messages only"
          itemRight={
            notificationType === 'messages' ? (
              <CheckLarge {...iconProps} />
            ) : undefined
          }
          divider={false}
        />
      </SettingsSection>
    </>
  );
};
