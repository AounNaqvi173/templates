import { Switch } from '@/craftrn-ui/components/Switch';
import React, { useState } from 'react';
import { PasscodeBottomSheet } from './PasscodeBottomSheet';
import { SectionHeader } from './SectionHeader';
import { SettingsItem } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

export const SecuritySection = () => {
  const [faceId, setFaceId] = useState(false);
  const [passcodeBottomSheetVisible, setPasscodeBottomSheetVisible] =
    useState(false);

  return (
    <>
      <SectionHeader>Security</SectionHeader>
      <SettingsSection>
        <SettingsItem
          text="Authenticate with Face ID"
          textBelow="Use Face ID to access the app"
          itemRight={<Switch value={faceId} onValueChange={setFaceId} />}
        />
        <SettingsItem
          onPress={() => setPasscodeBottomSheetVisible(true)}
          text="Change your passcode"
        />
        <SettingsItem
          onPress={() => null}
          text="Your devices"
          textBelow="2 devices connected"
          chevronRight={false}
          divider={false}
        />
      </SettingsSection>
      <PasscodeBottomSheet
        visible={passcodeBottomSheetVisible}
        onRequestClose={() => setPasscodeBottomSheetVisible(false)}
      />
    </>
  );
};
