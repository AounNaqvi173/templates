import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { PasscodeEntry } from '@/craftrn-ui/components/PasscodeEntry';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentProps, ComponentType } from 'react';
import { StyleSheet } from 'react-native-unistyles';
type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'visible'
>;

export const PasscodeBottomSheet: ComponentType<Props> = props => {
  return (
    <BottomSheet enableOverlayTapToClose {...props}>
      <Text variant="heading3" style={styles.title}>
        Enter your new passcode
      </Text>
      <PasscodeEntry onPasscodeEntered={props.onRequestClose} />
    </BottomSheet>
  );
};

const styles = StyleSheet.create(theme => ({
  title: {
    marginVertical: theme.spacing.large,
    textAlign: 'center',
  },
}));
