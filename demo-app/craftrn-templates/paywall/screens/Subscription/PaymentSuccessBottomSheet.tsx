import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { Button } from '@/craftrn-ui/components/Button';
import { Text } from '@/craftrn-ui/components/Text';
import { CheckBadgeFill } from '@/tetrisly-icons/CheckBadgeFill';
import React, { ComponentProps } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'visible' | 'onRequestClose'
> & {
  onPressContinue: () => void;
};

export const PaymentSuccessBottomSheet = ({
  visible,
  onRequestClose,
  onPressContinue,
}: Props) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <BottomSheet visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <CheckBadgeFill size={40} color={theme.colors.sunshineStrong} />
        </View>
        <Text variant="heading3" style={styles.textCenter}>
          Thank you for subscribing
        </Text>
        <Text
          color="contentSecondary"
          variant="body2"
          style={styles.textCenter}
        >
          All features are now unlocked for you. Dive in and enjoy everything we
          have to offer!
        </Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onPressContinue}>Continue</Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    gap: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  iconContainer: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
}));
