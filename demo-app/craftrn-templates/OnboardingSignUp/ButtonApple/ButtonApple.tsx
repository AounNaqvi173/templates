import { Text } from '@/craftrn-ui/components/Text';
import React from 'react';
import { Pressable, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AppleIcon } from './AppleIcon';

const ICON_SIZE = 40;

const colorWithOpacity = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  return `#${hex}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

export const ButtonApple = ({ onPress }: { onPress: () => void }) => {
  const colorScheme =
    UnistylesRuntime.colorScheme === 'dark' ? 'dark' : 'light';
  const { styles, theme } = useStyles(stylesheet, {
    colorScheme,
  });
  return (
    <Pressable onPress={onPress} hitSlop={4}>
      {({ pressed }) => (
        <View style={styles.button(pressed)}>
          <View style={styles.appleIcon}>
            <AppleIcon
              color={
                colorScheme === 'dark' ? theme.colors.black : theme.colors.white
              }
            />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text variant="body2" style={styles.buttonText}>
              Continue with Apple
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: (pressed: boolean) => ({
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    flexDirection: 'row',
    variants: {
      colorScheme: {
        light: {
          backgroundColor: colorWithOpacity(
            theme.colors.black,
            pressed ? 0.8 : 1,
          ),
        },
        dark: {
          backgroundColor: colorWithOpacity(
            theme.colors.white,
            pressed ? 0.8 : 1,
          ),
        },
      },
    },
  }),
  appleIcon: {
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
    variants: {
      colorScheme: {
        light: {
          color: theme.colors.white,
        },
        dark: {
          color: theme.colors.black,
        },
      },
    },
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
