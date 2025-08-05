import React, {
  ComponentType,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AnimatedKeyboardView } from './AnimatedKeyboardView';
import { getRandomAiResponse } from './data/ai-responses';
import {
  Message as MessageType,
  conversationsData,
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
  const { styles } = useStyles(stylesheet);

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
    <AnimatedKeyboardView style={styles.container}>
      <MessagesList
        messages={messages}
        aiAssistant={conversation.aiAssistant}
      />
      <MessageComposer onSendMessage={handleSendMessage} />
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
}));
