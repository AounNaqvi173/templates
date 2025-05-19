import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { ComponentType, useLayoutEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AnimatedKeyboardView } from '../../components/AnimatedKeyboardView';
import { discussionsData } from '../../data/discussions';
import { currentUser } from '../../data/users';
import { HeaderTitle } from './HeaderTitle';
import { MessageComposer } from './MessageComposer';
import { MessagesList } from './MessageList';

export const DiscussionsMessagesScreen: ComponentType = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { styles, theme } = useStyles(stylesheet);
  const insets = useSafeAreaInsets();

  const chat = useMemo(
    () => discussionsData.find(c => c.id === id) || undefined,
    [id],
  );

  useLayoutEffect(() => {
    const user = chat?.participants.find(
      participant => participant.id !== currentUser.id,
    );
    if (user) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        headerTitle: () => <HeaderTitle user={user} />,
      });
    }
  }, [chat?.participants, navigation, theme.colors.backgroundSecondary]);

  if (!chat) {
    return <></>;
  }

  return (
    <AnimatedKeyboardView
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <MessagesList participants={chat.participants} messages={chat.messages} />
      <MessageComposer />
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
}));
