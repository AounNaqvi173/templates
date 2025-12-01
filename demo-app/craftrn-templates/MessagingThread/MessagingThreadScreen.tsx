import {
  getDefaultHeaderHeight,
  useHeaderHeight,
} from '@react-navigation/elements';
import React, {
  ComponentType,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { ComposerHeightProvider } from './ComposerHeightContext';
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
  const headerHeight = useHeaderHeight();
  const { width, height } = useWindowDimensions();

  const keyboardVerticalOffset = useMemo(() => {
    if (Platform.OS === 'ios') {
      return headerHeight;
    }
    const calculatedHeaderHeight = getDefaultHeaderHeight(
      { width, height },
      false,
      0,
    );
    return calculatedHeaderHeight;
  }, [headerHeight, width, height]);

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
    <ComposerHeightProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <MessagesList
          participants={chat.participants}
          messages={chat.messages}
          onShowMoreBottomSheet={handleShowMoreBottomSheet}
        />
      </KeyboardAvoidingView>
      <MessageComposer />
      <MoreBottomSheet
        visible={moreBottomSheetVisible}
        onRequestClose={handleMoreBottomSheetRequestClose}
      />
    </ComposerHeightProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
