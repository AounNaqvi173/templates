import React from 'react';
import { Platform, Switch as RNSwitch, SwitchProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

/**
 * Props for the Switch component.
 * @see SwitchProps
 */
export type Props = Omit<SwitchProps, 'trackColor' | 'thumbColor' | 'style'>;

export const Switch = ({ ...props }: Props) => {
  const { theme } = useUnistyles();
  return (
    <RNSwitch
      trackColor={{
        false:
          Platform.OS === 'android'
            ? theme.colors.interactiveSecondary
            : theme.colors.interactiveNeutral,
        true:
          Platform.OS === 'android'
            ? theme.colors.interactivePrimary
            : theme.colors.interactiveSecondaryContent,
      }}
      thumbColor={
        Platform.OS === 'android'
          ? props.value
            ? theme.colors.interactiveSecondary
            : theme.colors.baseLight
          : undefined
      }
      style={styles.switch}
      {...props}
    />
  );
};

const styles = StyleSheet.create(() => ({
  switch: {
    transform: [{ scale: Platform.OS === 'android' ? 1 : 0.8 }],
  },
}));
