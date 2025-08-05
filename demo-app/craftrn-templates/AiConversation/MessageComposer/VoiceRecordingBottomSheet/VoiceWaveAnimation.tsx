import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const WAVE_HEIGHT = 30;

type VoiceWaveAnimationProps = {
  isAnimating: boolean;
};

export const VoiceWaveAnimation = ({
  isAnimating,
}: VoiceWaveAnimationProps) => {
  const { styles } = useStyles(stylesheet);

  // Create more wave bars for a smoother effect
  const waves = [
    useSharedValue(0.2),
    useSharedValue(0.4),
    useSharedValue(0.6),
    useSharedValue(0.3),
    useSharedValue(0.8),
    useSharedValue(1.0), // Center bar - tallest
    useSharedValue(0.7),
    useSharedValue(0.5),
    useSharedValue(0.4),
    useSharedValue(0.3),
    useSharedValue(0.2),
  ];

  const createNaturalAnimation = (waveValue: Animated.SharedValue<number>, baseHeight: number, index: number) => {
    'worklet';
    
    // Create more natural, random-like patterns
    const variations = [
      { height: baseHeight * 0.3, duration: 200 + Math.random() * 100 },
      { height: baseHeight * 0.8, duration: 150 + Math.random() * 100 },
      { height: baseHeight * 0.5, duration: 180 + Math.random() * 120 },
      { height: baseHeight * 0.9, duration: 160 + Math.random() * 80 },
      { height: baseHeight * 0.4, duration: 190 + Math.random() * 110 },
      { height: baseHeight * 0.7, duration: 170 + Math.random() * 90 },
    ];
    
    const animateSequence = () => {
      const randomVariation = variations[Math.floor(Math.random() * variations.length)];
      
      return withTiming(
        randomVariation.height,
        {
          duration: randomVariation.duration,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Natural easing
        },
      );
    };

    // Start with a slight delay based on position for wave effect
    const startDelay = index * 50;
    
    setTimeout(() => {
      waveValue.value = withRepeat(
        withSequence(
          animateSequence(),
          animateSequence(),
          animateSequence(),
          animateSequence(),
        ),
        -1,
        false,
      );
    }, startDelay);
  };

  useEffect(() => {
    if (isAnimating) {
      // Base heights for each bar (creates natural wave pattern)
      const baseHeights = [0.3, 0.5, 0.7, 0.4, 0.9, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3];
      
      waves.forEach((wave, index) => {
        createNaturalAnimation(wave, baseHeights[index], index);
      });
    } else {
      // Smoothly reset to base positions
      const baseHeights = [0.2, 0.4, 0.6, 0.3, 0.8, 1.0, 0.7, 0.5, 0.4, 0.3, 0.2];
      waves.forEach((wave, index) => {
        wave.value = withTiming(baseHeights[index] * 0.3, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        });
      });
    }
  }, [isAnimating]);

  return (
    <View style={styles.waveContainer}>
      {waves.map((wave, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          height: Math.max(wave.value * WAVE_HEIGHT, 2), // Minimum height of 2
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.waveBar, animatedStyle]}
          />
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3, // Tighter spacing for smoother look
    height: WAVE_HEIGHT,
  },
  waveBar: {
    width: 3, // Slightly thinner bars
    backgroundColor: theme.colors.contentAccent,
    borderRadius: 1.5, // Fully rounded ends
    minHeight: 2,
  },
}));
