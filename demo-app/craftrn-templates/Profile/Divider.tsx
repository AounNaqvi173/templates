import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create(({ colors }) => ({
  divider: {
    borderBottomColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
  },
}));
