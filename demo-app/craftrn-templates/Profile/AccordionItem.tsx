import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AccordionItemProps {
  isExpanded: boolean;
  children: React.ReactNode;
  viewKey: string;
  style?: ViewStyle;
  duration?: number;
}

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: AccordionItemProps) {
  const height = useSharedValue(0);
  const expandedState = useSharedValue(isExpanded);

  useEffect(() => {
    expandedState.value = isExpanded;
  }, [isExpanded]);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(expandedState.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default AccordionItem;
