import React, { useMemo } from 'react';
import { AccessibilityProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { type Theme } from '../../themes/config';
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

type Size = 'large' | 'regular' | 'small';
type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'neutral-secondary'
  | 'negative';

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

const useColorInterpolation = (config: {
  pressProgress: SharedValue<number>;
  colorConfig: ColorInterpolationConfig;
}) => {
  const { pressProgress, colorConfig } = config;

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

  const contentStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        pressProgress.value,
        [0, 1],
        [colorConfig.contentColor.unpressed, colorConfig.contentColor.pressed],
      ),
    }),
    [colorConfig.contentColor.unpressed, colorConfig.contentColor.pressed],
  );

  return { backgroundStyle, contentStyle };
};

const createButtonTokens = (theme: Theme) => {
  return {
    size: {
      small: {
        minHeight: 30,
        minWidth: 44,
      },
      regular: {
        minHeight: 40,
        minWidth: 44,
      },
      large: {
        minHeight: 48,
        minWidth: 44,
      },
    },
    spacing: {
      small: {
        paddingHorizontal: theme.spacing.small,
        paddingVertical: theme.spacing.xsmall,
        hitSlop: { top: 2, bottom: 2, left: 4, right: 4 },
      },
      regular: {
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.small,
        hitSlop: { top: 2, bottom: 2, left: 2, right: 2 },
      },
      large: {
        paddingHorizontal: theme.spacing.large,
        paddingVertical: theme.spacing.medium,
        hitSlop: { top: 0, bottom: 0, left: 0, right: 0 },
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
        tertiary: {
          normal: `${theme.colors.interactiveSecondary}00`,
          pressed: theme.colors.interactiveSecondary,
        },
        neutral: {
          normal: theme.colors.interactiveNeutral,
          pressed: theme.colors.interactiveNeutralPress,
        },
        'neutral-secondary': {
          normal: theme.colors.interactiveNeutralSecondary,
          pressed: theme.colors.interactiveNeutralSecondaryPress,
        },
        negative: {
          normal: theme.colors.sentimentNegative,
          pressed: theme.colors.sentimentNegativePress,
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
        tertiary: {
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
        negative: {
          normal: theme.colors.sentimentSecondaryNegative,
          pressed: theme.colors.sentimentSecondaryNegativePress,
        },
      },
    },
    borderRadius: {
      small: theme.borderRadius.full,
      regular: theme.borderRadius.full,
      large: theme.borderRadius.full,
    },
    typography: {
      small: { ...theme.textVariants.body3, fontWeight: '700' as '700' },
      regular: { ...theme.textVariants.body2, fontWeight: '700' as '700' },
      large: { ...theme.textVariants.body1, fontWeight: '700' as '700' },
    },
  };
};

type BaseProps = {
  /**
   * The text content of the button.
   */
  children: string | string[];
  /**
   * Callback function triggered when the button is pressed.
   */
  onPress: () => void;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The size of the button.
   * @default 'regular'
   */
  size?: Size;
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  variant?: Variant;
  /**
   * Animation configuration for press interactions
   */
  animationConfig?: AnimationConfig;
};

/**
 * Props for the Button component.
 * @see AccessibilityProps
 */
export type Props = BaseProps & AccessibilityProps;

export const Button = ({
  children,
  onPress,
  size = 'regular',
  disabled = false,
  variant = 'primary',
  animationConfig,
  ...accessibilityProps
}: Props) => {
  const { theme } = useUnistyles();

  const buttonTokens = useMemo(() => createButtonTokens(theme), [theme]);

  const pressProgress = useSharedValue(0);

  const colorConfig = useMemo<ColorInterpolationConfig>(() => {
    const bgColors = buttonTokens.colors.backgroundColor[variant];
    const contentColors = buttonTokens.colors.contentColor[variant];

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
  }, [variant, disabled, buttonTokens]);

  const { backgroundStyle, contentStyle } = useColorInterpolation({
    pressProgress,
    colorConfig,
  });

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      hitSlop={buttonTokens.spacing[size].hitSlop}
      role="button"
      animationConfig={animationConfig}
      pressProgress={pressProgress}
      {...accessibilityProps}
    >
      <Animated.View
        style={[styles.button({ size, disabled }), backgroundStyle]}
      >
        <Animated.Text style={[styles.text({ size }), contentStyle]}>
          {children}
        </Animated.Text>
      </Animated.View>
    </PressableScale>
  );
};

const styles = StyleSheet.create(theme => {
  const buttonTokens = createButtonTokens(theme);

  return {
    button: ({ size, disabled }: { size: Size; disabled: boolean }) => {
      const sizeTokens = buttonTokens.spacing[size];
      const sizeConfig = buttonTokens.size[size];
      return {
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        paddingVertical: sizeTokens.paddingVertical,
        minHeight: sizeConfig.minHeight,
        minWidth: sizeConfig.minWidth,
        borderRadius: buttonTokens.borderRadius[size],
      };
    },
    text: ({ size }: { size: Size }) => ({
      ...buttonTokens.typography[size],
      textAlign: 'center',
    }),
  };
});
