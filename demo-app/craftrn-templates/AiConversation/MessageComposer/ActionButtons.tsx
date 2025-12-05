import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { ArrowUp } from '@/tetrisly-icons/ArrowUp';
import { Mic } from '@/tetrisly-icons/Mic';
import { Plus } from '@/tetrisly-icons/Plus';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type ActionButtonsProps = {
  onAttachmentPress: () => void;
  onVoiceRecordingPress: () => void;
  onSendPress: () => void;
};

export const ActionButtons = ({
  onAttachmentPress,
  onVoiceRecordingPress,
  onSendPress,
}: ActionButtonsProps) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <ButtonRound
        renderContent={({ iconSize }) => (
          <Plus color={theme.colors.contentSecondary} size={iconSize} />
        )}
        animationConfig={{ scaleIn: 1.1 }}
        onPress={onAttachmentPress}
        variant="neutral"
      />
      <View style={styles.spacer} />
      <ButtonRound
        renderContent={({ iconSize }) => (
          <Mic color={theme.colors.contentSecondary} size={iconSize} />
        )}
        animationConfig={{ scaleIn: 1.1 }}
        onPress={onVoiceRecordingPress}
        variant="neutral"
      />
      <ButtonRound
        variant="reversed"
        renderContent={({ iconSize, iconColor }) => (
          <ArrowUp color={iconColor} size={iconSize} />
        )}
        animationConfig={{ scaleIn: 1.1 }}
        onPress={onSendPress}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.small,
  },
  spacer: {
    flex: 1,
  },
}));
