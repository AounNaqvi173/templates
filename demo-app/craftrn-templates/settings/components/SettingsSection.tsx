import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const SettingsSection: ComponentType<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { styles } = useStyles(stylesheet);
  return <View style={styles.section}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  section: {
    marginBottom: theme.spacing.large,
    marginHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
  },
}));
