import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { Button } from '@/craftrn-ui/components/Button';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'visible'
>;

export const SignOutBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
}) => {
  return (
    <BottomSheet
      enableOverlayTapToClose
      onRequestClose={onRequestClose}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="heading3">Sign out</Text>
          <Text variant="body2" color="contentTertiary">
            Are you sure you want to sign out?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button variant="neutral" onPress={onRequestClose}>
            Cancel
          </Button>
          <Button variant="negative" onPress={onRequestClose}>
            Confirm
          </Button>
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
  content: {
    marginBottom: theme.spacing.large,
  },
  buttonContainer: {
    gap: theme.spacing.small,
    paddingBottom: theme.spacing.large,
  },
}));
