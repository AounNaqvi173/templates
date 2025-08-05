import React, { useEffect, useRef, useState } from 'react';
import { TextStyle } from 'react-native';
import { FormattedText } from './FormattedText';

const TYPEWRITER_SPEED = 35; // milliseconds between words

type TypewriterTextProps = {
  children: string;
  style?: TextStyle;
  onComplete?: () => void;
};

export const TypewriterText = ({
  children,
  style,
  onComplete,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const words = children.split(' ').filter(word => word.length > 0);

  useEffect(() => {
    if (!children || words.length === 0) {
      setDisplayedText(children);
      return;
    }

    let currentWordIndex = 0;
    setDisplayedText('');

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText(prev => {
          if (currentWordIndex === 0) {
            return words[0];
          }
          return prev + ' ' + words[currentWordIndex];
        });
        currentWordIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onComplete?.();
      }
    }, TYPEWRITER_SPEED);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [children]);

  return <FormattedText style={style}>{displayedText}</FormattedText>;
};
