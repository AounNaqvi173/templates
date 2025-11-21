import type { Theme } from '@/craftrn-ui/themes/config';
import React, { useCallback, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { ActionButtons } from './ActionButtons';
import { AttachmentBottomSheet } from './AttachmentBottomSheet';
import { InputField } from './InputField';
import { VoiceRecordingBottomSheet } from './VoiceRecordingBottomSheet';

export const getStickyOffset = (theme: Theme) =>
  Math.max(UnistylesRuntime.insets.bottom, theme.spacing.medium);

type Props = {
  onSendMessage?: (content: string) => void;
  onHeightChange?: (height: number) => void;
};

export const MessageComposer = ({ onSendMessage, onHeightChange }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const { theme } = useUnistyles();
  const [isAttachmentSheetVisible, setIsAttachmentSheetVisible] =
    useState(false);
  const [isVoiceRecordingSheetVisible, setIsVoiceRecordingSheetVisible] =
    useState(false);

  const stickyOffset = getStickyOffset(theme);

  const handleSendPress = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && onSendMessage) {
      onSendMessage(trimmedValue);
      setInputValue('');
    }
  }, [inputValue, onSendMessage]);

  const handleAttachmentPress = useCallback(() => {
    setIsAttachmentSheetVisible(true);
  }, []);

  const handleAttachmentSheetClose = useCallback(() => {
    setIsAttachmentSheetVisible(false);
  }, []);

  const handleVoiceRecordingPress = useCallback(() => {
    setIsVoiceRecordingSheetVisible(true);
  }, []);

  const handleVoiceRecordingClose = useCallback(() => {
    setIsVoiceRecordingSheetVisible(false);
  }, []);

  const handleVoiceSend = useCallback(() => {
    if (onSendMessage) {
      onSendMessage('🎤 Voice message recorded');
    }
  }, [onSendMessage]);

  return (
    <KeyboardStickyView
      offset={{
        closed: 0,
        opened: stickyOffset,
      }}
    >
      <View
        style={styles.container}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          onHeightChange?.(height);
        }}
      >
        <InputField
          ref={inputRef}
          value={inputValue}
          onChangeText={setInputValue}
        />

        <ActionButtons
          onAttachmentPress={handleAttachmentPress}
          onVoiceRecordingPress={handleVoiceRecordingPress}
          onSendPress={handleSendPress}
        />
        <AttachmentBottomSheet
          visible={isAttachmentSheetVisible}
          onRequestClose={handleAttachmentSheetClose}
          onClose={handleAttachmentSheetClose}
        />
        <VoiceRecordingBottomSheet
          visible={isVoiceRecordingSheetVisible}
          onRequestClose={handleVoiceRecordingClose}
          onClose={handleVoiceRecordingClose}
          onSend={handleVoiceSend}
        />
      </View>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.backgroundElevated,
    paddingTop: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large + UnistylesRuntime.insets.bottom,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
  },
}));
