import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { ArrowUp } from '@/tetrisly-icons/ArrowUp';
import { Mic } from '@/tetrisly-icons/Mic';
import { Plus } from '@/tetrisly-icons/Plus';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

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
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <ButtonRound
        renderContent={({ iconSize }) => (
          <Plus color={theme.colors.contentSecondary} size={iconSize} />
        )}
        onPress={onAttachmentPress}
        intent="secondary"
      />
      <View style={styles.spacer} />
      <ButtonRound
        renderContent={({ iconSize }) => (
          <Mic color={theme.colors.contentSecondary} size={iconSize} />
        )}
        onPress={onVoiceRecordingPress}
        intent="secondary"
      />
      <ButtonRound
        variant="reversed"
        renderContent={({ iconSize, iconColor }) => (
          <ArrowUp color={iconColor} size={iconSize} />
        )}
        onPress={onSendPress}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
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
