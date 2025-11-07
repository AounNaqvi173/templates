import { Text } from '@/craftrn-ui/components/Text';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { GoogleIcon } from './GoogleIcon';

const ICON_SIZE = 48;

export const ButtonGoogle = ({ onPress }: { onPress: () => void }) => {
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

const styles = StyleSheet.create(theme => ({
  button: (pressed: boolean) => ({
    backgroundColor: pressed
      ? theme.colors.interactiveNeutralPress
      : theme.colors.interactiveNeutral,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.medium,
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
