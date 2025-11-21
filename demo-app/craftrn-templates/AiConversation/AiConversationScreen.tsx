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
import { getRandomAiResponse } from './data/ai-responses';
import {
  conversationsData,
  Message as MessageType,
} from './data/conversations';
import { MessageComposer } from './MessageComposer';
import { MessagesList } from './MessagesList';

type Props = {
  id: string;
  updateNavigationHeader: (title: string) => void;
};

export const AiConversationScreen: ComponentType<Props> = ({
  id,
  updateNavigationHeader,
}) => {
  const [composerHeight, setComposerHeight] = useState(80); // Default fallback
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

  const conversation = useMemo(
    () => conversationsData.find(conversation => conversation.id === id),
    [id],
  );

  const [messages, setMessages] = useState<MessageType[]>(
    conversation?.messages ?? [],
  );

  useLayoutEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
      updateNavigationHeader(conversation.title);
    }
  }, [conversation?.title, updateNavigationHeader]);

  /**
   * This function simulates sending a message and receiving a response.
   * In a real application, you would replace this with an API call to your AI service
   * and handle the response accordingly.
   */
  const handleSendMessage = useCallback((content: string) => {
    const randomResponse = getRandomAiResponse();

    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      date: new Date().toISOString(),
    };

    const newMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: randomResponse,
      date: new Date(Date.now() + 1000).toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage, newMessage]);
  }, []);

  if (!conversation) {
    return null;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <MessagesList
          messages={messages}
          aiAssistant={conversation.aiAssistant}
          composerHeight={composerHeight}
        />
      </KeyboardAvoidingView>
      <MessageComposer
        onSendMessage={handleSendMessage}
        onHeightChange={setComposerHeight}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
