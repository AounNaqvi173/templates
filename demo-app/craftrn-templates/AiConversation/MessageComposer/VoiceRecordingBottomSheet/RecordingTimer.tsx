import { Text } from '@/craftrn-ui/components/Text';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';

type RecordingTimerProps = {
  isRunning: boolean;
  shouldReset?: boolean;
  onTimeChange?: (time: number) => void;
};

export const RecordingTimer = ({
  isRunning,
  shouldReset = false,
  onTimeChange,
}: RecordingTimerProps) => {
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          onTimeChange?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, onTimeChange]);

  useEffect(() => {
    if (shouldReset) {
      setRecordingTime(0);
      onTimeChange?.(0);
    }
  }, [shouldReset, onTimeChange]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <Text variant="body3" color="contentSecondary" style={styles.timer}>
      {formatTime(recordingTime)}
    </Text>
  );
};

const styles = StyleSheet.create(() => ({
  timer: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
}));
