import { useEffect, useState } from 'react';

const LOADING_DURATION = 2000;

export const useMessageLoading = (isNewMessage: boolean) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isNewMessage) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, LOADING_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isNewMessage]);

  return {
    isLoading,
  };
};
