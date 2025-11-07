import React, { useMemo, useState } from 'react';
import {
  AccessibilityProps,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { type Theme } from '../../themes/config';
import { Text } from '../Text';

const createAvatarTokens = (theme: Theme) => {
  return {
    size: {
      small: {
        avatar: 32,
        indicator: 10,
      },
      medium: {
        avatar: 44,
        indicator: 12,
      },
      large: {
        avatar: 56,
        indicator: 14,
      },
    },
    colors: {
      fallback: {
        0: theme.colors.purple,
        1: theme.colors.maroon,
        2: theme.colors.forest,
        3: theme.colors.steel,
      },
      text: theme.colors.white,
      indicatorBorder: theme.colors.baseLight,
      indicatorBackground: theme.colors.sentimentPositive,
    },
  };
};

/**
 * Color of the avatar when the image cannot be loaded.
 */
export type AvatarColor = 0 | 1 | 2 | 3;

/**
 * Text variant mapping based on avatar size
 */
const textVariantBySize = {
  small: 'body3',
  medium: 'body2',
  large: 'body1',
} as const;

/**
 * A component that displays an avatar.
 * @see AccessibilityProps
 */
export type Props = {
  /**
   * The source of the image to display.
   */
  source?: ImageSourcePropType;
  /**
   * The fallback initials to display if the image cannot be loaded.
   */
  fallbackInitials?: string;
  /**
   * The fallback color to use if the image cannot be loaded.
   * @default AvatarColor[0]
   */
  fallbackColor?: AvatarColor;
  /**
   * Whether to show an online indicator.
   * @default false
   */
  showOnlineIndicator?: boolean;
  /**
   * The size of the avatar.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Alternative text for the image.
   */
  alt?: string;
};

type AvatarProps = Props & AccessibilityProps;

export const Avatar = ({
  source,
  fallbackInitials = '',
  fallbackColor = 0,
  showOnlineIndicator = false,
  size = 'medium',
  alt,
  ...accessibilityProps
}: AvatarProps) => {
  const { theme } = useUnistyles();
  const avatarTokens = useMemo(() => createAvatarTokens(theme), [theme]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasValidSource =
    source &&
    (typeof source === 'number' ||
      !('uri' in source) ||
      (source.uri && source.uri.trim() !== ''));

  const avatarIndicatorSize = avatarTokens.size[size].indicator;

  return (
    <View
      style={[
        styles.container({ size }),
        (!hasValidSource || !imageLoaded) &&
          styles.containerFallback({ color: fallbackColor }),
      ]}
      accessible
      accessibilityHint={showOnlineIndicator ? 'online' : undefined}
      {...accessibilityProps}
    >
      <View style={styles.fallbackContainer}>
        {(!hasValidSource || !imageLoaded) && (
          <Text variant={textVariantBySize[size]} style={styles.text}>
            {fallbackInitials}
          </Text>
        )}
        {hasValidSource && (
          <Image
            source={source}
            style={[styles.image, { opacity: imageLoaded ? 1 : 0 }]}
            onLoad={() => setImageLoaded(true)}
            alt={alt}
          />
        )}
      </View>
      {showOnlineIndicator && (
        <View
          style={[
            styles.indicator,
            { width: avatarIndicatorSize, height: avatarIndicatorSize },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => {
  const avatarTokens = createAvatarTokens(theme);

  return {
    container: (params: { size: 'small' | 'medium' | 'large' }) => ({
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ...(params.size === 'small' && {
        width: avatarTokens.size.small.avatar,
        height: avatarTokens.size.small.avatar,
        borderRadius: theme.borderRadius.full,
      }),
      ...(params.size === 'medium' && {
        width: avatarTokens.size.medium.avatar,
        height: avatarTokens.size.medium.avatar,
        borderRadius: theme.borderRadius.full,
      }),
      ...(params.size === 'large' && {
        width: avatarTokens.size.large.avatar,
        height: avatarTokens.size.large.avatar,
        borderRadius: theme.borderRadius.full,
      }),
    }),
    containerFallback: (params: { color: number }) => ({
      backgroundColor:
        avatarTokens.colors.fallback[params.color as 0 | 1 | 2 | 3],
    }),
    fallbackContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    image: {
      borderRadius: theme.borderRadius.full,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    text: {
      color: avatarTokens.colors.text,
      fontWeight: 'bold',
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: avatarTokens.colors.indicatorBorder,
      backgroundColor: avatarTokens.colors.indicatorBackground,
    },
  };
});
