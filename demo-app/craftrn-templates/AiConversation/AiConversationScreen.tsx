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
  const { theme } = useUnistyles();
  const headerHeight = useHeaderHeight();

  // Use measured header heights since React Navigation calculations are incorrect
  const keyboardVerticalOffset =
    Platform.OS === 'android'
      ? 112
      : UnistylesRuntime.insets.bottom
        ? headerHeight - theme.spacing.large
        : headerHeight;

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <MessagesList
        messages={messages}
        aiAssistant={conversation.aiAssistant}
      />
      <MessageComposer onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
}));
