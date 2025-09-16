import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { AiAssistant, Message } from '../data/conversations';
import { BackToBottomButton } from './BackToBottomButton';
import { MessageItem } from './MessageItem';
import { useNewMessageDetection } from './useNewMessageDetection';

type AssistantMessagesListProps = {
  messages: Message[];
  aiAssistant: AiAssistant;
};

export const MessagesList = ({ messages }: AssistantMessagesListProps) => {
  const [listHeight, setListHeight] = useState(0);
  const [userMessageHeight, setUserMessageHeight] = useState(0);
  const scrollRef = useAnimatedRef<Animated.FlatList<Message>>();
  const scrollPosition = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
  });

  const messagesReversed = useMemo(() => [...messages].reverse(), [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
  };

  const { isNewMessage } = useNewMessageDetection({
    messages,
    onNewMessages: scrollToBottom,
  });

  const handleUserMessageLayout = (event: LayoutChangeEvent) => {
    setUserMessageHeight(event.nativeEvent.layout.height);
  };

  const renderMessage = ({
    item: message,
    index,
  }: {
    item: Message;
    index: number;
  }) => (
    <MessageItem
      message={message}
      index={index}
      messagesReversed={messagesReversed}
      isNewMessage={isNewMessage(message.id)}
      listHeight={listHeight}
      userMessageHeight={userMessageHeight}
      onUserMessageLayout={handleUserMessageLayout}
    />
  );

  const handleListLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setListHeight(height);
  };

  return (
    <View style={styles.container} onLayout={handleListLayout}>
      <Animated.FlatList<Message>
        ref={scrollRef}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContentContainer}
        data={messagesReversed}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        onScroll={scrollHandler}
        inverted
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      />
      <BackToBottomButton
        scrollPosition={scrollPosition}
        scrollRef={scrollRef}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
}));
