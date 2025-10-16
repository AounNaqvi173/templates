import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { Home } from '@/tetrisly-icons/Home';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const { height: screenHeight } = Dimensions.get('window');

export const FloatingBackButton = () => {
  const router = useRouter();
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });

    const timer = setTimeout(() => {
      opacity.value = withTiming(0.5, { duration: 300 });
    }, 1000);

    return () => clearTimeout(timer);
  }, [opacity]);

  const handleBack = useCallback(() => {
    router.dismissTo('/templates');
  }, [router]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
      opacity.value = withTiming(1, { duration: 150 });
    })
    .onUpdate(event => {
      const newY = startY.value + event.translationY;
      const minY = -screenHeight * 0.4;
      const maxY = screenHeight * 0.4;
      translateY.value = Math.max(minY, Math.min(maxY, newY));
    })
    .onEnd(event => {
      if (Math.abs(event.velocityY) > 500) {
        translateY.value = withSpring(translateY.value, {
          velocity: event.velocityY,
          damping: 15,
          stiffness: 150,
        });
      }
      opacity.value = withTiming(0.5, { duration: 300 });
    });

  const tapGesture = Gesture.Tap()
    .onTouchesDown(() => {
      opacity.value = withTiming(1, { duration: 150 });
    })
    .onTouchesUp(() => {
      opacity.value = withTiming(0.5, { duration: 300 });
    })
    .onEnd(() => {
      runOnJS(handleBack)();
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.button}>
          <ButtonRound
            variant="accent"
            onPress={handleBack}
            renderContent={({ iconSize, iconColor }) => (
              <Home size={iconSize} color={iconColor} />
            )}
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create(({ spacing, borderRadius, colors }) => ({
  container: {
    position: 'absolute',
    left: 8,
    top: '50%',
    zIndex: 1000,
    transform: [{ translateY: -24 }],
  },
  button: {
    backgroundColor: colors.surfaceTertiary + '80',
    borderRadius: borderRadius.full,
    padding: spacing.small,
  },
}));
