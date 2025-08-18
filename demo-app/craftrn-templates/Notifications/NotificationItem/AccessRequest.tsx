import { Button } from '@/craftrn-ui/components/Button';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const AccessRequest = ({
  onPressConfirm,
  onPressDeny,
}: {
  onPressConfirm: () => void;
  onPressDeny: () => void;
}) => {
  const { styles } = useStyles(stylesheet);
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

const stylesheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
}));
