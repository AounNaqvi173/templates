import React, {
  ComponentType,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LayoutChangeEvent, ListRenderItemInfo } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const CARD_HEIGHT = 400;

interface CardProps {
  index: number;
  scrollY: SharedValue<number>;
  children: React.ReactNode;
}

const Card: ComponentType<CardProps> = ({ index, scrollY, children }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [
        (index - 1) * CARD_HEIGHT,
        (index - 0.5) * CARD_HEIGHT,
        index * CARD_HEIGHT,
        (index + 1) * CARD_HEIGHT,
        (index + 2) * CARD_HEIGHT,
      ],
      [0.9, 0.95, 1, 0.95, 0.9],
    );

    const opacity = interpolate(scale, [0.9, 1], [0.6, 1]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[cardStyles.card, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const cardStyles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.medium,
    height: CARD_HEIGHT,
  },
}));

export interface VerticalCarouselHandle {
  scrollToTop: () => void;
}

type VerticalCarouselProps<T> = {
  offsetTop?: number;
  data: T[];
  onScroll?: (sharedValue: SharedValue<number>) => void;
  renderItem: (props: ListRenderItemInfo<T>) => React.ReactElement;
};

export const VerticalCarousel = forwardRef(function VerticalCarousel<
  T extends object,
>(
  { offsetTop = 0, data, renderItem, onScroll }: VerticalCarouselProps<T>,
  ref: React.ForwardedRef<VerticalCarouselHandle>,
) {
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList<T>>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
  }));

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    onScroll?.(scrollY);
  });

  const handleFlatListLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const renderCard = useCallback(
    (props: ListRenderItemInfo<T>) => (
      <Card index={props.index} scrollY={scrollY}>
        {renderItem(props)}
      </Card>
    ),
    [renderItem, scrollY],
  );

  const contentContainerStyle = useMemo(() => {
    const paddingAdjustment = containerHeight
      ? (containerHeight - CARD_HEIGHT) / 2
      : 0;
    const paddingTop = offsetTop;
    const paddingBottom = 2 * paddingAdjustment - offsetTop;

    return {
      paddingBottom,
      paddingTop,
    };
  }, [containerHeight, offsetTop]);

  return (
    <Animated.FlatList
      ref={flatListRef}
      onLayout={handleFlatListLayout}
      data={data}
      renderItem={renderCard}
      keyExtractor={(_, index) => index.toString()}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      snapToInterval={CARD_HEIGHT}
      decelerationRate="fast"
      contentContainerStyle={contentContainerStyle}
    />
  );
}) as <T extends object>(
  props: VerticalCarouselProps<T> & {
    ref?: React.ForwardedRef<VerticalCarouselHandle>;
  },
) => React.ReactElement;
