import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type ComposerHeightContextValue = {
  composerHeight: number;
  setComposerHeight: (height: number) => void;
};

const ComposerHeightContext = createContext<
  ComposerHeightContextValue | undefined
>(undefined);

export const ComposerHeightProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [composerHeight, setComposerHeight] = useState(80); // Default fallback

  return (
    <ComposerHeightContext.Provider
      value={{ composerHeight, setComposerHeight }}
    >
      {children}
    </ComposerHeightContext.Provider>
  );
};

export const useComposerHeight = () => {
  const context = useContext(ComposerHeightContext);
  if (context === undefined) {
    throw new Error(
      'useComposerHeight must be used within a ComposerHeightProvider',
    );
  }
  return context;
};
