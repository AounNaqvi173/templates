import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Switch } from '@/craftrn-ui/components/Switch';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SectionHeader } from './SectionHeader';

export const ProfileSettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [wishlistVisibility, setWishlistVisibility] = useState(true);

  const { styles } = useStyles(stylesheet);
  return (
    <>
      <SectionHeader>Profile Settings</SectionHeader>
      <Card>
        <ListItem
          style={styles.settingsItem}
          text="Public Profile"
          textBelow="Make your profile visible to others"
          itemRight={
            <Switch
              value={profileVisibility}
              onValueChange={setProfileVisibility}
            />
          }
          divider
        />
        <ListItem
          style={styles.settingsItem}
          text="Share Wishlist"
          textBelow="Allow others to see your wishlist items"
          itemRight={
            <Switch
              value={wishlistVisibility}
              onValueChange={setWishlistVisibility}
            />
          }
        />
      </Card>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  settingsItem: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    minHeight: 56,
  },
}));
