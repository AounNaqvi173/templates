import { Switch } from '@/craftrn-ui/components/Switch';
import { Text } from '@/craftrn-ui/components/Text';
import { Bell } from '@/tetrisly-icons/Bell';
import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import { Headphones } from '@/tetrisly-icons/Headphones';
import { Notification } from '@/tetrisly-icons/Notification';
import { VolumeMedium } from '@/tetrisly-icons/VolumeMedium';
import { useNavigation } from '@react-navigation/native';
import React, { ComponentType, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SettingsItem } from '../../components/SettingsItem';
import { SettingsSection } from '../../components/SettingsSection';

type NotificationType = 'all' | 'messages-mentions' | 'messages';

export const SettingsNotificationsScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notificationMuted, setNotificationMuted] = useState(false);
  const [notificationType, setNotificationType] =
    useState<NotificationType>('all');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.backgroundSecondary,
      },
      cardStyle: {
        backgroundColor: theme.colors.backgroundSecondary,
      },
    });
  }, [navigation, theme.colors.backgroundSecondary]);

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ gap: theme.spacing.small }}
    >
      <Text style={styles.sectionHeader}>Push notifications</Text>
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
        />
        <SettingsItem
          itemLeft={<VolumeMedium {...iconProps} />}
          onPress={() => null}
          text="Sound"
          textBelow="Buzzer"
          divider={false}
        />
      </SettingsSection>
      <Text style={styles.sectionHeader}>Notify me about</Text>
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
    </ScrollView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    marginTop: theme.spacing.medium,
  },
  sectionHeader: {
    ...theme.textVariants.body3,
    fontWeight: 'bold',
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.large,
  },
}));
