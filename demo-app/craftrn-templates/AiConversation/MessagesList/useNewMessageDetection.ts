import { useEffect, useRef, useState } from 'react';
import { Message } from '../data/conversations';

export const useNewMessageDetection = ({
  messages,
  onNewMessages,
}: {
  messages: Message[];
  onNewMessages: (newMessageIds: string[]) => void;
}) => {
  const previousMessageCount = useRef(messages.length);
  const [newMessageIds, setNewMessageIds] = useState<string[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousMessageCount.current = messages.length;
      return;
    }

    if (
      !isInitialMount.current &&
      messages.length > previousMessageCount.current
    ) {
      const newMessages = messages.slice(previousMessageCount.current);
      const newIds = newMessages.map(msg => msg.id);

      setNewMessageIds(newIds);
      onNewMessages(newIds);
    }

    previousMessageCount.current = messages.length;
  }, [messages.length, onNewMessages]);

  const isNewMessage = (messageId: string) => newMessageIds.includes(messageId);

  return {
    newMessageIds,
    isNewMessage,
  };
};
