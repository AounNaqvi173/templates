import React, {
  ComponentType,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AnimatedKeyboardView } from './AnimatedKeyboardView';
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
  const { styles, theme } = useStyles(stylesheet);

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
  }, [chat?.participants, theme.colors.backgroundSecondary]);

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
      <AnimatedKeyboardView
        style={[
          styles.container,
          { paddingBottom: UnistylesRuntime.insets.bottom },
        ]}
      >
        <MessagesList
          participants={chat.participants}
          messages={chat.messages}
          onShowMoreBottomSheet={handleShowMoreBottomSheet}
        />
        <MessageComposer />
      </AnimatedKeyboardView>
      <MoreBottomSheet
        visible={moreBottomSheetVisible}
        onRequestClose={handleMoreBottomSheetRequestClose}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
}));
