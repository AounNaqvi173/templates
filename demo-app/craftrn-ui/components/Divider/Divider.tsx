import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';

const createDividerTokens = (theme: typeof lightTheme | typeof darkTheme) => {
  return {
    colors: {
      divider: theme.colors.borderNeutral,
    },
  };
};

/**
 * Props for the Divider component.
 */
export type Props = Pick<ViewProps, 'style'> & {
  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
};

export const Divider = ({ orientation = 'horizontal', style }: Props) => {
  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        StyleSheet.flatten(style),
      ]}
    />
  );
};

const styles = StyleSheet.create(theme => {
  const dividerTokens = createDividerTokens(theme);

  return {
    horizontal: {
      borderBottomColor: dividerTokens.colors.divider,
      borderBottomWidth: 1,
    },
    vertical: {
      borderRightColor: dividerTokens.colors.divider,
      borderRightWidth: 1,
      height: '100%',
    },
  };
});
