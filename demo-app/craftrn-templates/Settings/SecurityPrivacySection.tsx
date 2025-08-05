import { Card } from '@/craftrn-ui/components/Card';
import { File } from '@/tetrisly-icons/File';
import { Help } from '@/tetrisly-icons/Help';
import { LogOut } from '@/tetrisly-icons/LogOut';
import { UserClose } from '@/tetrisly-icons/UserClose';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SectionHeader } from './SectionHeader';
import { SettingsItem } from './SettingsItem';
import { SignOutBottomSheet } from './SignOutBottomSheet';

export const SecurityPrivacySection = () => {
  const [signOutBottomSheetVisible, setSignOutBottomSheetVisible] =
    useState(false);
  const { styles, theme } = useStyles(stylesheet);

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <>
      <SectionHeader>Security & Privacy</SectionHeader>
      <Card style={styles.card}>
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
          chevronRight={false}
        />
        <SettingsItem
          itemLeft={<UserClose {...iconProps} />}
          onPress={() => null}
          text="Delete account"
          chevronRight={false}
        />
        <SettingsItem
          itemLeft={<LogOut {...iconProps} />}
          onPress={() => setSignOutBottomSheetVisible(true)}
          text="Sign out"
          divider={false}
        />
      </Card>
      <SignOutBottomSheet
        onRequestClose={() => setSignOutBottomSheetVisible(false)}
        visible={signOutBottomSheetVisible}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  card: {
    marginBottom: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
  },
}));
