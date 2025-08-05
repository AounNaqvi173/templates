import React, { ReactElement } from 'react';
import { AccessibilityProps, Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const config = {
  buttonSize: 32,
  iconSize: 18,
  hitSlop: 2,
};

export type Props = {
  onPress?: () => void;
  renderContent: (props: { iconSize: number }) => ReactElement;
};

type PrimaryButtonProps = Props & AccessibilityProps;

export const PrimaryButton = ({
  onPress,
  renderContent,
  ...accessibilityProps
}: PrimaryButtonProps) => {
  const { styles } = useStyles(stylesheet);
  const { iconSize, hitSlop } = config;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop}
      role="button"
      {...accessibilityProps}
    >
      {({ pressed }) => (
        <View style={styles.button({ pressed })}>
          {renderContent({ iconSize })}
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(({ borderRadius, colors }) => ({
  button: ({ pressed }: { pressed: boolean }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    width: config.buttonSize,
    height: config.buttonSize,
    backgroundColor: pressed ? colors.contentSecondary : colors.contentPrimary,
  }),
}));
