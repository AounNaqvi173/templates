import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { Copy } from '@/tetrisly-icons/Copy';
import { Refresh } from '@/tetrisly-icons/Refresh';
import { ThumbDown } from '@/tetrisly-icons/ThumbDown';
import { ThumbUp } from '@/tetrisly-icons/ThumbUp';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type ActionButtonsProps = {
  isVisible: boolean;
};

export const ActionButtons = ({ isVisible }: ActionButtonsProps) => {
  const { theme } = useUnistyles();

  if (!isVisible) return null;

  return (
    <View style={styles.actionButtons}>
      <Animated.View entering={FadeIn.duration(300).delay(200)}>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <Copy color={theme.colors.contentTertiary} size={iconSize} />
          )}
          onPress={() => console.log('Copy pressed')}
          size="small"
          variant="neutral"
        />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(300).delay(240)}>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <ThumbUp color={theme.colors.contentTertiary} size={iconSize} />
          )}
          onPress={() => console.log('Like pressed')}
          size="small"
          variant="neutral"
        />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(300).delay(280)}>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <ThumbDown color={theme.colors.contentTertiary} size={iconSize} />
          )}
          onPress={() => console.log('Dislike pressed')}
          size="small"
          variant="neutral"
        />
      </Animated.View>
      <Animated.View entering={FadeIn.duration(300).delay(320)}>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <Refresh color={theme.colors.contentTertiary} size={iconSize} />
          )}
          onPress={() => console.log('Try again pressed')}
          size="small"
          variant="neutral"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    marginTop: theme.spacing.xsmall,
  },
}));
