import { useHeaderHeight } from '@react-navigation/elements';
import React, {
  ComponentType,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { discussionsData } from './data/discussions';
import { currentUser, User } from './data/users';
import { MessageComposer } from './MessageComposer';
import { MessagesList } from './MessagesList';
import { MoreBottomSheet } from './MoreBottomSheet';

type Props = {
  id: string;
  updateNavigationHeader: (user: User) => void;
};

export const MessagingThreadScreen: ComponentType<Props> = ({
  id,
  updateNavigationHeader,
}) => {
  const [moreBottomSheetVisible, setMoreBottomSheetVisible] = useState(false);
  const { theme } = useUnistyles();

  const headerHeight = useHeaderHeight();

  // Use measured header heights since React Navigation calculations are incorrect
  const keyboardVerticalOffset =
    Platform.OS === 'android'
      ? 64
      : UnistylesRuntime.insets.bottom
        ? headerHeight - theme.spacing.large
        : headerHeight;

  const chat = useMemo(
    () => discussionsData.find(c => c.id === id) || undefined,
    [id],
  );

  useLayoutEffect(() => {
    const user = chat?.participants.find(
      participant => participant.id !== currentUser.id,
    );
    if (user) {
      updateNavigationHeader(user);
    }
  }, [chat?.participants, updateNavigationHeader]);

  const handleShowMoreBottomSheet = useCallback(() => {
    setMoreBottomSheetVisible(true);
  }, []);

  const handleMoreBottomSheetRequestClose = useCallback(() => {
    setMoreBottomSheetVisible(false);
  }, []);

  if (!chat) {
    return <></>;
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <MessagesList
          participants={chat.participants}
          messages={chat.messages}
          onShowMoreBottomSheet={handleShowMoreBottomSheet}
        />
        <MessageComposer />
      </KeyboardAvoidingView>
      <MoreBottomSheet
        visible={moreBottomSheetVisible}
        onRequestClose={handleMoreBottomSheetRequestClose}
      />
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
}));
