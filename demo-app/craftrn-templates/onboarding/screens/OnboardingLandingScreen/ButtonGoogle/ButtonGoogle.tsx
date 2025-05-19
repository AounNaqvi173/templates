import { Text } from '@/craftrn-ui/components/Text';
import React from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { GoogleIcon } from './GoogleIcon';

const ICON_SIZE = 40;

export const ButtonGoogle = ({ onPress }: { onPress: () => void }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <Pressable onPress={onPress} hitSlop={4}>
      {({ pressed }) => (
        <View style={styles.button(pressed)}>
          <View style={styles.googleIcon}>
            <GoogleIcon />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text variant="body2" style={styles.buttonText}>
              Continue with Google
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (pressed: boolean) => ({
    backgroundColor: pressed
      ? theme.colors.backgroundTertiary
      : theme.colors.backgroundPrimary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.small,
    flexDirection: 'row',
  }),
  googleIcon: {
    position: 'absolute',
    width: ICON_SIZE,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
