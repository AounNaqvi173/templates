import { ArrowDown } from '@/tetrisly-icons/ArrowDown';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  AnimatedRef,
  runOnUI,
  scrollTo,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const ANIMATION_DURATION = 250;
const SCROLL_POSITION_THRESHOLD = 50;

export const BackToBottomButton = ({
  scrollPosition,
  scrollRef,
}: {
  scrollPosition: SharedValue<number>;
  scrollRef: AnimatedRef<Animated.FlatList<any>>;
}) => {
  const { theme } = useUnistyles();

  const backToBottomButtonStyle = useAnimatedStyle(() => {
    const { value } = scrollPosition;
    return {
      opacity: withTiming(value > SCROLL_POSITION_THRESHOLD ? 1 : 0, {
        duration: ANIMATION_DURATION,
      }),
      transform: [
        {
          translateY: withTiming(value > SCROLL_POSITION_THRESHOLD ? 0 : 10, {
            duration: ANIMATION_DURATION,
          }),
        },
      ],
    };
  });

  const handlePressBackToBottomButton = () => {
    runOnUI(() => {
      scrollTo(scrollRef, 0, 0, true);
    })();
  };

  return (
    <Animated.View style={backToBottomButtonStyle}>
      <Pressable onPress={handlePressBackToBottomButton}>
        <View style={styles.button}>
          <ArrowDown color={theme.colors.contentPrimary} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create(theme => ({
  button: {
    backgroundColor: theme.colors.surfacePrimary,
    bottom: theme.spacing.small,
    position: 'absolute',
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center',
    shadowColor: theme.colors.shadowPrimary,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
}));
