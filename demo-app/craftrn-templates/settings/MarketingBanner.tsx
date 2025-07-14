import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Button } from '../../craftrn-ui/components/Button/Button';
import { Text } from '../../craftrn-ui/components/Text/Text';

export const MarketingBanner = () => {
  const { theme, styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Svg style={styles.gradientBackground} width="100%" height="100%">
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="8%" y2="100%">
            <Stop offset="20%" stopColor={theme.colors.accentQuaternary} />
            <Stop offset="100%" stopColor={theme.colors.accentTertiary} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#gradient)" />
      </Svg>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="heading3" style={styles.title}>
            Upgrade to Premium
          </Text>
          <Text variant="body2" style={styles.subtitle}>
            Unlock exclusive features and get the most out of your experience.
          </Text>
        </View>
        <Button variant="primary" onPress={() => {}}>
          Upgrade Now
        </Button>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.large,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: theme.spacing.medium,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.large,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.medium,
  },
  title: {
    color: theme.colors.accentPrimary,
    marginBottom: theme.spacing.xsmall,
  },
  subtitle: {
    color: theme.colors.accentSecondary,
  },
}));
