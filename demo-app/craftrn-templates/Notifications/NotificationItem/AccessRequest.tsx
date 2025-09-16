import { Button } from '@/craftrn-ui/components/Button';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const AccessRequest = ({
  onPressConfirm,
  onPressDeny,
}: {
  onPressConfirm: () => void;
  onPressDeny: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Button intent="secondary" size="small" onPress={onPressDeny}>
        Deny
      </Button>
      <Button size="small" onPress={onPressConfirm}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
}));
