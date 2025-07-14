import { Switch } from '@/craftrn-ui/components/Switch';
import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { SettingsItem } from './SettingsItem';
import { SettingsSection } from './SettingsSection';

export const PrivacySection = () => {
  const [contacts, setContacts] = useState(false);

  return (
    <>
      <SectionHeader>Privacy</SectionHeader>
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
          chevronRight={false}
        />
        <SettingsItem
          onPress={() => null}
          text="Marketing communications"
          textBelow="Manage your marketing consent"
          chevronRight={false}
        />
      </SettingsSection>
    </>
  );
};
