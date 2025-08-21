import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { ArrowUp } from '@/tetrisly-icons/ArrowUp';
import { Close } from '@/tetrisly-icons/Close';
import React, {
  ComponentProps,
  ComponentType,
  useCallback,
  useState,
} from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { RecordingTimer } from './RecordingTimer';
import { VoiceWaveAnimation } from './VoiceWaveAnimation';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'onClose' | 'visible'
> & {
  onSend?: () => void;
};

export const VoiceRecordingBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
  onClose,
  onSend,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);

  const handleClose = useCallback(() => {
    setShouldResetTimer(true);
    setTimeout(() => setShouldResetTimer(false), 100);
    onClose?.();
  }, [onClose]);

  const handleSend = useCallback(() => {
    onSend?.();
    onRequestClose?.();
  }, [onSend, onRequestClose]);

  return (
    <BottomSheet
      enableOverlayTapToClose
      onRequestClose={onRequestClose}
      onClose={handleClose}
      visible={visible}
      variant="secondary"
      showHandleBar={false}
    >
      <View style={styles.container}>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <Close color={theme.colors.contentSecondary} size={iconSize} />
          )}
          onPress={onRequestClose}
          intent="primary"
          size="large"
        />
        <View style={styles.centerSection}>
          <VoiceWaveAnimation isAnimating={visible} />
          <RecordingTimer isRunning={visible} shouldReset={shouldResetTimer} />
        </View>
        <ButtonRound
          renderContent={({ iconSize }) => (
            <ArrowUp color={theme.colors.contentSecondary} size={iconSize} />
          )}
          onPress={handleSend}
          intent="primary"
          size="large"
        />
      </View>
    </BottomSheet>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.xlarge,
    paddingBottom: Math.max(
      UnistylesRuntime.insets.bottom + theme.spacing.medium,
      theme.spacing.xlarge,
    ),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
  },
}));
