import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const Divider: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  return <View style={styles.divider} />;
};

const stylesheet = createStyleSheet(({ colors }) => ({
  divider: {
    borderBottomColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
  },
}));
