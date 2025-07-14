import { Text } from '@/craftrn-ui/components/Text';
import { Archive } from '@/tetrisly-icons/Archive';
import { MoreHorizontal } from '@/tetrisly-icons/MoreHorizontal';
import React, { ReactNode, RefObject, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const RIGHT_ACTION_WIDTH = 72;

interface RightActionProps {
  text: string;
  icon: React.ReactElement;
  color: string;
  x: number;
  progress: SharedValue<number>;
  totalWidth: number;
  swipeableRef?: RefObject<SwipeableMethods>;
  onPress: () => void;
}

const RightAction = ({
  text,
  icon,
  color,
  x,
  progress,
  totalWidth,
  swipeableRef,
  onPress,
}: RightActionProps) => {
  const { styles } = useStyles(rightActionStylesheet);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, -totalWidth], [x, 0]),
      },
    ],
  }));

  const handleOnPress = useCallback(() => {
    if (swipeableRef?.current) {
      swipeableRef.current.close();
    }
    onPress();
  }, [swipeableRef, onPress]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <RectButton style={[styles.rectButton(color)]} onPress={handleOnPress}>
        <View
          style={styles.rectButtonContent}
          accessible
          accessibilityRole="button"
        >
          {icon}
          <Text variant="body2" style={styles.text}>
            {text}
          </Text>
        </View>
      </RectButton>
    </Animated.View>
  );
};

const rightActionStylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  rectButton: (backgroundColor: string) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 300,
    backgroundColor,
  }),
  rectButtonContent: {
    width: RIGHT_ACTION_WIDTH,
    alignItems: 'center',
    gap: theme.spacing.xxsmall,
  },
  text: {
    color: theme.colors.white,
    fontWeight: 'semibold',
  },
}));

type SwipeableRowProps = {
  onPressMore: () => void;
  onPressArchive: () => void;
  children: ReactNode;
};

export const SwipeableRow = ({
  children,
  onPressMore,
  onPressArchive,
}: SwipeableRowProps) => {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(_, progress) => (
        <View style={styles.rightAction}>
          <RightAction
            text="More"
            icon={<MoreHorizontal color={theme.colors.white} />}
            color={theme.colors.surfaceQuaternary}
            x={RIGHT_ACTION_WIDTH * 2}
            progress={progress}
            totalWidth={RIGHT_ACTION_WIDTH * 2}
            swipeableRef={swipeableRef as RefObject<SwipeableMethods>}
            onPress={onPressMore}
          />
          <RightAction
            text="Archive"
            icon={<Archive color={theme.colors.white} />}
            color={theme.colors.accentSecondary}
            x={RIGHT_ACTION_WIDTH}
            progress={progress}
            totalWidth={RIGHT_ACTION_WIDTH * 2}
            swipeableRef={swipeableRef as RefObject<SwipeableMethods>}
            onPress={onPressArchive}
          />
        </View>
      )}
    >
      {children}
    </ReanimatedSwipeable>
  );
};

const stylesheet = createStyleSheet({
  rightAction: {
    flexDirection: 'row',
    width: RIGHT_ACTION_WIDTH * 2,
  },
});
