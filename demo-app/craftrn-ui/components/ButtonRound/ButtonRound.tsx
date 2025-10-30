import React, { ReactElement, useMemo } from 'react';
import { AccessibilityProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';
import { PressableScale, type AnimationConfig } from '../PressableScale';

/**
 * Convert a hex color to grayscale using luminance formula (0.299*R + 0.587*G + 0.114*B)
 */
const hexToGrayscale = (hex: string): string =>
  `#${Math.round(
    0.299 * parseInt(hex.slice(1, 3), 16) +
      0.587 * parseInt(hex.slice(3, 5), 16) +
      0.114 * parseInt(hex.slice(5, 7), 16),
  )
    .toString(16)
    .padStart(2, '0')
    .repeat(3)}${hex.length === 9 ? hex.slice(7) : ''}`;

type Size = 'large' | 'medium' | 'small';
type Variant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'neutral-secondary'
  | 'reversed';

type ColorInterpolationConfig = {
  backgroundColor: {
    unpressed: string;
    pressed: string;
  };
  contentColor: {
    unpressed: string;
    pressed: string;
  };
};

const useColorInterpolation = (
  pressProgress: SharedValue<number>,
  colorConfig: ColorInterpolationConfig,
) => {
  const backgroundStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        pressProgress.value,
        [0, 1],
        [
          colorConfig.backgroundColor.unpressed,
          colorConfig.backgroundColor.pressed,
        ],
      ),
    }),
    [
      colorConfig.backgroundColor.unpressed,
      colorConfig.backgroundColor.pressed,
    ],
  );

  return { backgroundStyle };
};

const createButtonRoundTokens = (
  theme: typeof lightTheme | typeof darkTheme,
) => {
  return {
    size: {
      small: {
        buttonSize: 24,
        iconSize: 14,
        hitSlop: 4,
      },
      medium: {
        buttonSize: 32,
        iconSize: 18,
        hitSlop: 2,
      },
      large: {
        buttonSize: 40,
        iconSize: 24,
        hitSlop: 2,
      },
    },
    colors: {
      backgroundColor: {
        primary: {
          normal: theme.colors.interactivePrimary,
          pressed: theme.colors.interactivePrimaryPress,
        },
        secondary: {
          normal: theme.colors.interactiveSecondary,
          pressed: theme.colors.interactiveSecondaryPress,
        },
        neutral: {
          normal: theme.colors.interactiveNeutral,
          pressed: theme.colors.interactiveNeutralPress,
        },
        'neutral-secondary': {
          normal: theme.colors.interactiveNeutralSecondary,
          pressed: theme.colors.interactiveNeutralSecondaryPress,
        },
        reversed: {
          normal: theme.colors.interactiveNeutralReversed,
          pressed: theme.colors.interactiveNeutralReversedPress,
        },
      },
      contentColor: {
        primary: {
          normal: theme.colors.interactivePrimaryContent,
          pressed: theme.colors.interactivePrimaryContentPress,
        },
        secondary: {
          normal: theme.colors.interactiveSecondaryContent,
          pressed: theme.colors.interactiveSecondaryContentPress,
        },
        neutral: {
          normal: theme.colors.interactiveNeutralContent,
          pressed: theme.colors.interactiveNeutralContentPress,
        },
        'neutral-secondary': {
          normal: theme.colors.interactiveNeutralContent,
          pressed: theme.colors.interactiveNeutralContentPress,
        },
        reversed: {
          normal: theme.colors.interactiveNeutralReversedContent,
          pressed: theme.colors.interactiveNeutralReversedContentPress,
        },
      },
    },
  };
};

type BaseProps = {
  /**
   * Callback function triggered when the button is pressed.
   */
  onPress?: () => void;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Function that renders an icon or other content inside the button.
   * @param props.iconSize - The suggested size of the icon in pixels, depending on the button size.
   * @param props.iconColor - The appropriate color for the icon based on the button variant.
   */
  renderContent: (props: {
    iconSize: number;
    iconColor: string;
  }) => ReactElement;
  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: Size;
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  variant?: Variant;
  /**
   * Animation configuration for press interactions
   * @default { scaleIn: 1, durationIn: 150, durationOut: 150, easing: Easing.out(Easing.cubic) }
   */
  animationConfig?: AnimationConfig;
};

/**
 * Props for the ButtonRound component.
 * @see AccessibilityProps
 */
export type Props = BaseProps & AccessibilityProps;

export const ButtonRound = ({
  onPress,
  size = 'medium',
  disabled = false,
  renderContent,
  variant = 'primary',
  animationConfig,
  ...accessibilityProps
}: Props) => {
  const { theme } = useUnistyles();

  const buttonRoundTokens = useMemo(
    () => createButtonRoundTokens(theme),
    [theme],
  );

  const sizeTokens = buttonRoundTokens.size[size];

  const pressProgress = useSharedValue(0);

  const colorConfig = useMemo<ColorInterpolationConfig>(() => {
    const bgColors = buttonRoundTokens.colors.backgroundColor[variant];
    const contentColors = buttonRoundTokens.colors.contentColor[variant];

    return {
      backgroundColor: {
        unpressed: disabled ? hexToGrayscale(bgColors.normal) : bgColors.normal,
        pressed: disabled ? hexToGrayscale(bgColors.pressed) : bgColors.pressed,
      },
      contentColor: {
        unpressed: disabled
          ? hexToGrayscale(contentColors.normal)
          : contentColors.normal,
        pressed: disabled
          ? hexToGrayscale(contentColors.pressed)
          : contentColors.pressed,
      },
    };
  }, [variant, disabled, buttonRoundTokens]);

  const { backgroundStyle } = useColorInterpolation(pressProgress, colorConfig);

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      hitSlop={sizeTokens.hitSlop}
      role="button"
      style={styles.container({ size })}
      animationConfig={animationConfig}
      pressProgress={pressProgress}
      {...accessibilityProps}
    >
      <Animated.View
        style={[styles.button({ disabled, size }), backgroundStyle]}
      >
        {renderContent({
          iconSize: sizeTokens.iconSize,
          iconColor: colorConfig.contentColor.unpressed,
        })}
      </Animated.View>
    </PressableScale>
  );
};

const styles = StyleSheet.create(theme => {
  const buttonTokens = createButtonRoundTokens(theme);

  return {
    container: ({ size }: { size: Size }) => {
      return {
        alignItems: 'center',
        justifyContent: 'center',
      };
    },
    button: ({ disabled, size }: { disabled: boolean; size: Size }) => {
      const sizeTokens = buttonTokens.size[size];

      return {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.full,
        opacity: disabled ? 0.5 : 1,
        width: sizeTokens.buttonSize,
        height: sizeTokens.buttonSize,
      };
    },
  };
});
