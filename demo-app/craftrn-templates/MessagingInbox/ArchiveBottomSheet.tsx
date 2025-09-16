import { BottomSheet } from '@/craftrn-ui/components/BottomSheet/BottomSheet';
import { Button } from '@/craftrn-ui/components/Button/Button';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'visible'
> & {
  onPressCancel: () => void;
  onPressConfirm: () => void;
};

export const ArchiveBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
  onPressCancel,
  onPressConfirm,
}) => {
  
  return (
    <BottomSheet
      enableOverlayTapToClose
      onRequestClose={onRequestClose}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text variant="heading3">Archive this chat</Text>
          <Text variant="body2" color="contentSecondary">
            Are you sure you want to archive this chat?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button intent="secondary" onPress={onPressCancel}>
            Cancel
          </Button>
          <Button onPress={onPressConfirm}>Confirm</Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  textContainer: {
    marginBottom: theme.spacing.large,
  },
  buttonContainer: {
    gap: theme.spacing.small,
  },
}));
