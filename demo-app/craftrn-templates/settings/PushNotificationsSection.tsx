import { Switch } from '@/craftrn-ui/components/Switch';
import { Bell } from '@/tetrisly-icons/Bell';
import { Headphones } from '@/tetrisly-icons/Headphones';
import { Notification } from '@/tetrisly-icons/Notification';
import { VolumeMedium } from '@/tetrisly-icons/VolumeMedium';
import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { SectionHeader } from './SectionHeader';
import { SettingsItem } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

export const PushNotificationsSection = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notificationMuted, setNotificationMuted] = useState(false);
  const { theme } = useStyles();

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <>
      <SectionHeader>Push notifications</SectionHeader>
      <SettingsSection>
        {/*
          You can add support for setting up push notifications using an
          external library such as react-native-notifications or notifee
        */}
        <SettingsItem
          itemLeft={<Bell {...iconProps} />}
          text="Enable push notifications"
          itemRight={
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
            />
          }
        />
        <SettingsItem
          itemLeft={<Notification {...iconProps} />}
          text="Mute all notifications"
          itemRight={
            <Switch
              value={notificationMuted}
              onValueChange={setNotificationMuted}
            />
          }
        />
        <SettingsItem
          itemLeft={<Headphones {...iconProps} />}
          onPress={() => null}
          text="Notification schedule"
          textBelow="9am to 5pm"
          chevronRight={false}
        />
        <SettingsItem
          itemLeft={<VolumeMedium {...iconProps} />}
          onPress={() => null}
          text="Sound"
          textBelow="Buzzer"
          chevronRight={false}
          divider={false}
        />
      </SettingsSection>
    </>
  );
};
