import React, { useCallback, useRef, useState } from 'react';
import { TextInput, View, ViewProps } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { ActionButtons } from './ActionButtons';
import { AttachmentBottomSheet } from './AttachmentBottomSheet';
import { InputField } from './InputField';
import { VoiceRecordingBottomSheet } from './VoiceRecordingBottomSheet';

type Props = {
  onSendMessage?: (content: string) => void;
  onLayout?: ViewProps['onLayout'];
};

export const MessageComposer = ({ onSendMessage, onLayout }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [isAttachmentSheetVisible, setIsAttachmentSheetVisible] =
    useState(false);
  const [isVoiceRecordingSheetVisible, setIsVoiceRecordingSheetVisible] =
    useState(false);

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
    <View style={styles.container} onLayout={onLayout}>
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
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    paddingTop: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    paddingBottom: Math.max(
      UnistylesRuntime.insets.bottom,
      theme.spacing.large,
    ),
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    elevation: 12,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
}));
