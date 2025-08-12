import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Home } from '../tetrisly-icons/Home';

const { height: screenHeight } = Dimensions.get('window');

export const FloatingBackButton = () => {
  const { styles, theme } = useStyles(stylesheet);
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
  }, []);

  const handleBack = useCallback(() => {
    router.dismissAll();
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
          <Pressable onPress={handleBack} hitSlop={2} role="button">
            {({ pressed }) => (
              <View style={styles.innerButton({ pressed })}>
                <Home size={18} color={theme.colors.white} />
              </View>
            )}
          </Pressable>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const stylesheet = createStyleSheet(({ borderRadius, colors }) => ({
  container: {
    position: 'absolute',
    left: 8,
    top: '50%',
    zIndex: 1000,
    transform: [{ translateY: -24 }],
  },
  button: {
    backgroundColor: colors.surfaceTertiary + '80',
    borderRadius: 24,
    padding: 8,
  },
  innerButton: ({ pressed }: { pressed: boolean }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    width: 32,
    height: 32,
    backgroundColor: pressed ? colors.accentSecondary : colors.accentPrimary,
  }),
}));
