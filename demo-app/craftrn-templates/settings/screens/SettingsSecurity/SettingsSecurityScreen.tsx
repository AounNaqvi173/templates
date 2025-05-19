import { Switch } from '@/craftrn-ui/components/Switch';
import { useNavigation } from '@react-navigation/native';
import React, { ComponentType, useLayoutEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SettingsItem } from '../../components/SettingsItem';
import { SettingsSection } from '../../components/SettingsSection';
import { PasscodeBottomSheet } from './PasscodeBottomSheet';

export const SettingsSecurityScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [faceId, setFaceId] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [passcodeBottomSheetVisible, setPasscodeBottomSheetVisible] =
    useState(false);

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

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.sectionHeader}>Security</Text>
        <SettingsSection>
          <SettingsItem
            text="Authenticate with Face ID"
            textBelow="Use Face ID to access the app"
            itemRight={<Switch value={faceId} onValueChange={setFaceId} />}
          />
          <SettingsItem
            onPress={() => null}
            text="Your devices"
            textBelow="2 devices connected"
          />
          <SettingsItem
            onPress={() => setPasscodeBottomSheetVisible(true)}
            text="Change your passcode"
            chevronRight={false}
            divider={false}
          />
        </SettingsSection>
        <Text style={styles.sectionHeader}>Privacy</Text>
        <SettingsSection>
          <SettingsItem
            text="Sync your phone contact"
            textBelow="Access your contacts who use the app"
            itemRight={<Switch value={contacts} onValueChange={setContacts} />}
          />
          <SettingsItem
            onPress={() => null}
            text="Third party apps"
            textBelow="3 apps connected"
          />
          <SettingsItem
            onPress={() => null}
            text="Marketing communications"
            textBelow="Manage your marketing consent"
            divider={false}
          />
        </SettingsSection>
      </ScrollView>
      <PasscodeBottomSheet
        visible={passcodeBottomSheetVisible}
        onRequestClose={() => setPasscodeBottomSheetVisible(false)}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    gap: theme.spacing.small,
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
