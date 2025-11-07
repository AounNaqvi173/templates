import React from 'react';
import { StyleSheet as RNStyleSheet, View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { type Theme } from '../../themes/config';

const createCardTokens = (theme: Theme) => {
  return {
    colors: {
      background: theme.colors.backgroundElevated,
    },
  };
};

/**
 * Props for the Card component.
 */
export type Props = Pick<ViewProps, 'children' | 'style'>;

export const Card = ({ children, style, ...viewProps }: Props) => {
  return (
    <View style={[styles.card, RNStyleSheet.flatten(style)]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => {
  const cardTokens = createCardTokens(theme);

  return {
    card: {
      backgroundColor: cardTokens.colors.background,
      borderRadius: theme.borderRadius.large,
      overflow: 'hidden',
    },
  };
});
