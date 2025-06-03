import { Card } from '@/craftrn-ui/components/Card';
import { Text } from '@/craftrn-ui/components/Text';
import { Bell } from '@/tetrisly-icons/Bell';
import { File } from '@/tetrisly-icons/File';
import { Help } from '@/tetrisly-icons/Help';
import { Lock } from '@/tetrisly-icons/Lock';
import { LogOut } from '@/tetrisly-icons/LogOut';
import { Shield } from '@/tetrisly-icons/Shield';
import { UserClose } from '@/tetrisly-icons/UserClose';
import { UserEdit } from '@/tetrisly-icons/UserEdit';
import { useRouter } from 'expo-router';
import React, { ComponentType, useState } from 'react';
import { ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SettingsItem } from '../../components/SettingsItem';
import { SignOutBottomSheet } from './SignOutBottomSheet';

export const SettingsMainScreen: ComponentType = () => {
  const [signOutBottomSheetVisible, setSignOutBottomSheetVisible] =
    useState(false);
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionHeader}>General</Text>
        <Card style={styles.card}>
          <SettingsItem
            itemLeft={<Bell {...iconProps} />}
            onPress={() => router.push('/settings/notifications')}
            text="Notifications"
            chevronRight
          />
          <SettingsItem
            itemLeft={<Lock {...iconProps} />}
            onPress={() => router.push('/settings/security')}
            text="Privacy & security"
            chevronRight
            divider={false}
          />
        </Card>
        <Text style={styles.sectionHeader}>Account</Text>
        <Card style={styles.card}>
          <SettingsItem
            itemLeft={<UserEdit {...iconProps} />}
            onPress={() => router.push('/settings/edit-profile')}
            text="Edit personal information"
            chevronRight
          />
          <SettingsItem
            itemLeft={<LogOut {...iconProps} />}
            onPress={() => setSignOutBottomSheetVisible(true)}
            text="Sign out"
          />
          <SettingsItem
            itemLeft={<UserClose {...iconProps} />}
            onPress={() => null}
            text="Delete account"
            chevronRight={false}
            divider={false}
          />
        </Card>
        <Text style={styles.sectionHeader}>Other</Text>
        <Card style={styles.card}>
          <SettingsItem
            itemLeft={<Shield {...iconProps} />}
            onPress={() => null}
            text="Privacy policy"
            chevronRight={false}
          />
          <SettingsItem
            itemLeft={<File {...iconProps} />}
            onPress={() => null}
            text="Terms of service"
            chevronRight={false}
          />
          <SettingsItem
            itemLeft={<Help {...iconProps} />}
            onPress={() => null}
            text="Support"
            divider={false}
            chevronRight={false}
          />
        </Card>
      </ScrollView>
      <SignOutBottomSheet
        onRequestClose={() => setSignOutBottomSheetVisible(false)}
        visible={signOutBottomSheetVisible}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    marginTop: theme.spacing.medium,
  },
  scrollContent: {
    gap: theme.spacing.small,
  },
  sectionHeader: {
    ...theme.textVariants.body3,
    fontWeight: 'bold',
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.large,
  },
  card: {
    marginBottom: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
  },
}));
