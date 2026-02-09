import React, { ComponentType } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../../craftrn-ui/components/Card';

export const SettingsSection: ComponentType<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Card style={styles.section}>{children}</Card>;
};

const styles = StyleSheet.create(theme => ({
  section: {
    marginBottom: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
  },
}));
