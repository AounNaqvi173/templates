import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { AiAssistant, Message } from '../data/conversations';
import { BackToBottomButton } from './BackToBottomButton';
import { MessageItem } from './MessageItem';
import { useNewMessageDetection } from './useNewMessageDetection';

type AssistantMessagesListProps = {
  messages: Message[];
  aiAssistant: AiAssistant;
  composerHeight: number;
};

export const MessagesList = ({
  messages,
  composerHeight,
}: AssistantMessagesListProps) => {
  const [listHeight, setListHeight] = useState(0);
  const [userMessageHeight, setUserMessageHeight] = useState(0);
  const scrollRef = useAnimatedRef<Animated.FlatList<Message>>();
  const scrollPosition = useSharedValue(0);
  const { progress } = useReanimatedKeyboardAnimation();
  const { theme } = useUnistyles();

  // Calculate padding based on measured composer height and platform-specific adjustments
  // iOS: Just the composer height
  // Android: composerHeight + bottomInset - spacing.large (accounts for the added bottom inset in composer)
  const keyboardPadding =
    Platform.OS === 'ios'
      ? composerHeight - UnistylesRuntime.insets.bottom
      : composerHeight + UnistylesRuntime.insets.bottom - theme.spacing.large;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
  });

  const flatListAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: progress.value * keyboardPadding,
    };
  });

  const backToBottomAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -progress.value * keyboardPadding }],
    };
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
      composerHeight={composerHeight}
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
        style={[styles.flatList, flatListAnimatedStyle]}
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
      <Animated.View style={backToBottomAnimatedStyle}>
        <BackToBottomButton
          scrollPosition={scrollPosition}
          scrollRef={scrollRef}
        />
      </Animated.View>
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
