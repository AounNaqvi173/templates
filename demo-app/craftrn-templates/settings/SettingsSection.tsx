import React, { ComponentType } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Card } from '../../craftrn-ui/components/Card';

export const SettingsSection: ComponentType<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { styles } = useStyles(stylesheet);
  return <Card style={styles.section}>{children}</Card>;
};

const stylesheet = createStyleSheet(theme => ({
  section: {
    marginBottom: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
  },
}));
